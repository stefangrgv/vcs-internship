import {
  React,
  useState,
  useEffect
} from 'react';
import {
  Link,
  useOutletContext,
  useMatch,
} from 'react-router-dom';
import {
  apiSubmitNewList,
  apiSubmitEditedList,
  apiLoadLinkList,
  apiGetAllLinks,
  apiPostNewLink,
  apiListDelete,
} from './apiRequests';
import { getShareListModalBody } from './Modal';
import './style.css';
import minimizeIcon from './img/minimize.png';
import maximizeIcon from './img/maximize.png';

function LinkList (props) {
  const context = useOutletContext();
  const match = useMatch(`/${props.mode === 'edit' ? 'edit' : 'list'}/:id`);

  let [isResponseOk, setResponseOk] = useState(false);
  let [isLoaded, setLoaded] = useState(false);
  let [isFetchingLinks, setFetchingLinks] = useState(false);
  let [editedURL, setEditedURL] = useState('');
  let [allLinks, setAllLinks] = useState([]);
  let [isPrivate, setPrivate] = useState(false);
  let [owner, setOwner] = useState('');
  let [links, setLinks] = useState([]);
  let [title, setTitle] = useState('');
  let [newURL, setNewURL] = useState('');
  let [errorMessage, setErrorMessage] = useState('');

  async function fetchAllLinks () {
    let response = await apiGetAllLinks(props.user);
    if (response.status === 200) {
      setAllLinks(response.data);
      setFetchingLinks(false);
    } else {
      context.setModalShow(true);
      context.setModalYesText('OK');
      context.setModalYesOnclick( () => hideModal );
      context.setModalNoText('');
      context.setModalBody(response.message);
    }
  }

  useEffect( () => {
    async function fetchList () {
      let response = await apiLoadLinkList(match.params.id, props.user);
      if (response.status === 200) {
        setTitle(response.data.title);
        setLinks(response.data.links);
        setOwner(response.data.owner);
        setPrivate(response.data.private);
        setLoaded(true);
        setResponseOk(true);
      } else {
        let message = response.message;
        console.log(response)
        if (response.response.status === 401) {
          message = 'You are not logged in.';
        } else if (response.response.status === 403) {
          message = 'Permission denied: this list is private.';
        } else if (response.response.status === 404) {
          message = 'List not found!';
        }
        setErrorMessage(message);
      }
    }

    if (props.mode !== 'new') {
      fetchList();
    }

    fetchAllLinks();
  }, []);

  useEffect( () => {
    if ((isLoaded || props.mode === 'new') &&
        links.find((l) => l.needsRendering &&
        !isFetchingLinks)) {
      let newLinks = links.map((link) => {
        if (link.needsRendering) {
          let linkDbEntry = linkUpdateInfo(link.url);
          if (linkDbEntry === undefined) {
            setFetchingLinks(true);
            fetchAllLinks();
            return link;
          }
          return linkDbEntry;
        } else {
          return link;
        }
      });

      setLinks(newLinks);
    }
  });

  const hideModal = () => {
    context.setModalShow(false);
  }

  const linkMinimizeMaximize = (id) => {
    let newLinks = links;
    newLinks[id].isMinimized = !newLinks[id].isMinimized;
    setLinks(newLinks);
  }

  const formatURLInput = (input) => {
    // Formats the URL to be properly handled by the DB
    let parsedURL = input.replace('www.', '');
    while (parsedURL.startsWith('/')) {
      parsedURL = parsedURL.slice(1);
    }

    if (!parsedURL.startsWith('http://') && !parsedURL.startsWith('https://')) {
      parsedURL = 'http://' + parsedURL;
    }

    if (parsedURL.endsWith('/')) { 
      parsedURL = parsedURL.slice(0, -1);
    }

    return parsedURL;
  }

  const formatThumbnails = () => {
    /* 
    Formats the URL paths of all the thumbnails in the list.
    In some cases they are not accepted by the backend unless reformatted.
    */
    setLinks(links.map((link) => {
        let l = link;
        l['thumbnail'] = formatURLInput(link['thumbnail']);
        return l;
      }),
    );
  }

  const trimLinkTitle = () => {
    /*
    Trims the title of the links to ensure it fits the
    limit enforced in the database (100 symbols).
    */
    setLinks(links.map((link) => {
        if (link['title'].length < 100) {
          return link;
        }

        let l = link;
        l['title'] = l['title'].slice(0, 97) + '...';
        return l;
      }),
    );
  }

  //////////////////////////////////////
  //  REACT ONCHANGE METHODS
  //////////////////////////////////////
  const onChangeNewURL = (event) => {
    setNewURL(event.target.value);
  }

  const onChangeEditedURL = (event) => {
    editedURL = event.target.value;
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  const onChangePrivacy = () => {
    setPrivate(!isPrivate);
  }
  //////////////////////////////////////

  //////////////////////////////////////
  //  LINKLIST OPERATIONS:
  //    SAVE / DELETE
  //////////////////////////////////////
  const linkListSave = async () => {
    if (title.replaceAll(' ', '') === '') {
      context.setModalShow(true);
      context.setModalYesText('OK');
      context.setModalYesOnclick( () => hideModal );
      context.setModalNoText('');
      context.setModalBody('Please enter a title!');
      return null
    }

    formatThumbnails();
    trimLinkTitle();

    if (props.mode === 'edit') {
      let response = await apiSubmitEditedList(match.params.id, props.user, title, links, isPrivate);
      context.setModalShow(true);
      context.setModalYesText('OK');
      context.setModalNoText('');
      
      if (response.status === 200) {
        context.setModalYesOnclick( () => () => window.location.href = `/list/${match.params.id}/` );
        context.setModalBody('Success!');
      } else {
        context.setModalYesOnclick( () => hideModal);
        context.setModalBody(response.error.message);
      }
    } else {
      let response = await apiSubmitNewList(props.user, title, links, isPrivate);
      if (response.status === 201) {
        window.location.href = `/list/${response.data.id}/`;
        // <Navigate to={`/list/${response.data.id}/`} replace={true}/>  
      } else {
        context.setModalShow(true);
        context.setModalYesText('OK');
        context.setModalYesOnclick( () => hideModal );
        context.setModalNoText('');
        context.setModalBody(response.error.message);
      }
    }
  }

  const linkListAskDelete = (link) => {
    context.setModalShow(true);
    context.setModalYesText('Yes');
    context.setModalYesOnclick( () => async () => {
      await apiListDelete(match.params.id, props.user);
      window.location.href = '/myprofile/';
    });
    context.setModalNoText('No');
    context.setModalNoOnclick( () => hideModal );
    context.setModalBody('Are you sure you want to delete this linklist?');
  }
  //////////////////////////////////////

  //////////////////////////////////////
  //  LINK OPERATIONS:
  //    ADD / EDIT / DELETE / GET
  //////////////////////////////////////
  const linkValidate = (url) => {
    if (url.replaceAll(' ', '') === '') {
      context.setModalShow(true);
      context.setModalYesText('OK');
      context.setModalYesOnclick( () => hideModal );
      context.setModalBody('Please enter a non-empty URL.');
      context.setModalNoText('');
      return false;
    }

    if (links.find((l) => l.url === formatURLInput(url))) {
      context.setModalShow(true);
      context.setModalYesOnclick( () => hideModal );
      context.setModalYesText('OK');
      context.setModalBody('This link is already in the list.');
      context.setModalNoText('');
      return false;
    }

    return true;
  }

  const linkAdd = async () => {
    if (linkValidate(newURL)) {
      let parsedURL = formatURLInput(newURL)
      setLinks([...links, {url: parsedURL, needsRendering: true}]);
      setNewURL('');
      
      // if link is not present in the db, add it
      if (!allLinks.find((l) => l.url === parsedURL)) {
        let response = await apiPostNewLink(props.user, parsedURL);
        // this will typically fail if the url is invalid
        if (response.response.status >= 400) {
          const errorContents = JSON.parse(response.request.response);
          setLinks([links.pop()]);
          context.setModalShow(true);
          context.setModalYesOnclick( () => hideModal );
          context.setModalYesText('OK');
          context.setModalBody(
            errorContents.url !== undefined ? errorContents.url : response.message
          );
          context.setModalNoText('');
        }
      }
    }
  }

  const linkDelete = (link) => {
    setLinks(links.filter((l) => {
      return l !== link;
    }));
  }

  const linkAskDelete = (link) => {
    context.setModalShow(true);
    context.setModalYesOnclick( () => () => {
        linkDelete(link);
        hideModal();
      });
    context.setModalYesText('Yes');
    context.setModalBody('Are you sure you want to delete this link?');
    context.setModalNoText('No');
    context.setModalNoOnclick( () => hideModal );
  }

  const linkUpdateInfo = (url) => {
    return allLinks.find((l) => {
      return (l.url === formatURLInput(url))
    })
  }
  //////////////////////////////////////

  //////////////////////////////////////
  //  EDIT MODAL ONCLICK METHODS
  //////////////////////////////////////
  const modalSave = (n) => {
    console.log(editedURL)
    if (linkValidate(editedURL)) {
      let parsedURL = formatURLInput(editedURL);
      if (!allLinks.find((l) => l.url === parsedURL)) {
        apiPostNewLink(props.user, parsedURL);
        fetchAllLinks();
      }

      let newLinks = links.map((x) => x);
      newLinks[n] = {
        url: editedURL,
        title: editedURL,
        id: n,
        description: 'loading...',
        thumbnail: '',
        needsRendering: true
      };

      context.setModalShow(false);
      setLinks(newLinks);
      setEditedURL('');
    }
  }

  const modalCancel = () => {
    context.setModalShow(false);
    setEditedURL('');
  }
  //////////////////////////////////////

  //////////////////////////////////////
  //  RENDER PAGE ELEMENTS
  //////////////////////////////////////
  const renderPrivacy = () => {
    if (props.mode === 'new' ||
        props.mode === 'edit') {
      return (
      <div className='panel privacy-panel'>
        <h3>Is this a private list: </h3>
        <input
          type = 'checkbox'
          checked = {isPrivate}
          onChange = {onChangePrivacy}
        />
      </div>
      )
    }
  }

  const renderListTitlePanel = () => {
    return(
      props.mode !== 'view' ? (
        <div className='panel title-and-owner-panel'>
          <h3>List title: </h3>
          <input
            className='input-field input-field-large'
            placeholder='Enter list title'
            onChange={onChangeTitle}
            value = {title}/>
        </div>
      ):
      (
        <div className='panel title-and-owner-panel'>
          <h3 className = 'list-title-privacy'>{title}</h3>
          { props.mode === 'view' &&
            owner === props.user.username ?
            <>
              <h5 className = 'list-title-privacy'>{
              isPrivate ?
              'private list' : ''
              }</h5>
              <button 
                className='btn'
                onClick={() => {
                  props.history.push(`/edit/${match.params.id}/`);
                  props.history.go(`/edit/${match.params.id}/`);
                  //window.location.href = `/edit/${match.params.id}/`
              }}>Edit list</button>
            </> : <></>
          }
          { props.mode === 'view' ?
          <>
            <button 
              className='btn'
              onClick={() => {
                context.setModalShow(true);
                context.setModalBody(
                  getShareListModalBody(match.params.id, props.domainName)
                );
                context.setModalYesOnclick( () => hideModal );
                context.setModalYesText('OK');
            }}>Share list</button>
          </> : <></>
          }
        </div>
      )
    )
  }

  const renderLinksPanel = () => {
    return (
      links.map((link, n) => { return (
        // link contents: title, description, thumbnail and url
        <div className='link-content' key={'link-content' + n}>
          {link.needsRendering ?
            (
            <div className='link-title' key={'title' + n}>
              <h4 key={`num${n}`}> {link.url}</h4>
            </div>
            ):
            (
            <div className='link-title' key={'title' + n}>
              <h4 key={`num${n}`}> {link.title}</h4>
              {link.isMinimized ?
              <button
                className = 'img-btn img-btn-btn'
                onClick = {() => linkMinimizeMaximize(n)}
              ><img
                className = 'img-btn'
                alt = 'maximize'
                src = {maximizeIcon}/></button> :
              <button
                className = 'img-btn img-btn-btn'
                onClick = {() => linkMinimizeMaximize(n)}
              ><img
                className = 'img-btn'
                alt = 'minimize'
                src = {minimizeIcon}/></button>
              }
            </div>)
            }
          {link.needsRendering || link.isMinimized ?
            (<></>):
            (
            <div className='link-description' key={'desc' + n}>
              <img className='link-thumbnail'
              src={link.thumbnail}
              alt={link.url + ' thumbnail'}
              />
              <h5>{link.description}</h5>
            </div>
            )
            }
          <div className='link-hyperlink' key={'hlink' + n}>
            <h4><Link 
              className='hyperlink'
              key={`url${n}`}
              to = {`/redirect/${encodeURIComponent(link.url)}`}
              target = '_blank'>{link.url}</Link></h4>
          </div>
          {// edit and delete buttons
            props.mode === 'new' ||
            (props.mode === 'edit' &&
              props.user.username === owner)
            ? (
            <div className='links-buttons' key={'links-buttons ' + n}>
              <button
                className='btn'
                key={`edit${n}`}
                onClick={
                  () => renderEditLinkModal(n)
                }>Edit</button>
              <button
                className='btn btn-delete'
                  key={`del${n}`}
                  onClick={
                    () => linkAskDelete(link)
                  }>Delete</button>
            </div>
            ): <></>
          }
        </div>
      )})
    )
  }

  const renderAddURLPanel = () => {
    return (props.mode !== 'view') ?
    (
      <div className='panel new-url-field'>
        <h4>Add URL: </h4>
        <input
          className='input-field input-field-large'
          placeholder = 'Enter URL'
          onChange = {onChangeNewURL}
          value = {newURL} />
      <button
        className='btn'
        onClick={
          () => linkAdd()
        }>Add</button>
      </div>
    ):
    <></>
  }

  const renderEditLinkModal = (n) => {
    context.setModalShow(true);
    context.setModalYesOnclick( () => () => modalSave(n) );
    context.setModalYesText('Save');
    context.setModalNoOnclick( () => modalCancel );
    context.setModalNoText('Cancel');
    context.setModalBody(
      <input
        className='input-field input-field-large'
        onChange = {onChangeEditedURL}
        placeholder = 'Enter URL'
      />
    );
  }

  const renderSaveListPanel = () => {
    return (
    (props.mode === 'new' ||
    (props.mode === 'edit' &&
      props.user.username === owner)) ? (
      <div className='panel save-list-panel'>
        <button
         className='btn btn-large'
         onClick={
          linkListSave
        }>Save LinkList</button>
      </div>
    ): <></>
    )
  }

  const renderDeleteListPanel = () => {
    return (
    (props.mode === 'edit' &&
      props.user.username === owner) ? (
      <div className='panel'>
        <button
         className='btn btn-large btn-delete'
         onClick={
          () => linkListAskDelete()
        }>Delete LinkList</button>
      </div>
    ): <></>
    )
  }
  //////////////////////////////////////

  let content = <h5>loading...</h5>

  if (isLoaded || props.mode === 'new') {
    if (props.mode === 'new' && props.user.username === null) {
      content = (
        <div className='error-message'>
          You are not logged in.
        </div>
      )
    } else {
      content = (
      <div className='list-content'>
      {renderListTitlePanel()}
      {renderPrivacy()}
      {renderLinksPanel()}
      {renderAddURLPanel()}
      {renderSaveListPanel()}
      {renderDeleteListPanel()}
      </div>
    );
  }
  } else if (!isResponseOk) {
    content = (
      <div className='error-message'>
        {errorMessage}
      </div>
    )
  }
  return (
    <div className='list-content'>
      {content}
    </div>
  )
}

export default LinkList;
