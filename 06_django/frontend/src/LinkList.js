import {
  React,
  useState,
  useEffect
} from 'react';
import {
  Link,
  useOutletContext,
  useMatch,
  useNavigate,
} from 'react-router-dom';
import {
  apiSubmitNewList,
  apiSubmitEditedList,
  apiLoadLinkList,
  apiGetAllLinks,
  apiPostNewLink,
  apiListDelete,
} from './apiRequests';
import { createShareModalBody } from './Modal';
import './style.css';
import minimizeIcon from './img/minimize.png';
import maximizeIcon from './img/maximize.png';

function LinkList (props) {
  const context = useOutletContext();
  const match = useMatch(`/${props.mode === 'edit' ? 'edit' : 'list'}/:id`);
  const navigate = useNavigate();

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
    let response = await apiGetAllLinks(context.user);
    if (response.status === 200) {
      setAllLinks(response.data);
      setFetchingLinks(false);
    } else {
      context.showMessageModal(response.message);
    }
  }

  async function fetchList () {
    let response = await apiLoadLinkList(match.params.id, context.user);
    if (response.status === 200) {
      setTitle(response.data.title);
      setLinks(response.data.links);
      setOwner(response.data.owner);
      setPrivate(response.data.private);
      setLoaded(true);
      setResponseOk(true);
    } else {
      let message = response.message;
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

  useEffect( () => {
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

  const linkMinimizeMaximize = (id) => {
    let newLinks = links.slice();
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
      context.showMessageModal('Please enter a title!');
      return null
    }

    formatThumbnails();
    trimLinkTitle();

    if (props.mode === 'edit') {
      let response = await apiSubmitEditedList(
        match.params.id, context.user, title, links, isPrivate);
      context.showMessageModal();

      if (response.status === 200) {
        context.setModalYesOnclick( () => () => {
          navigate(`/list/${match.params.id}/`)
          context.hideModal();
        });
        context.setModalBody('Success!');
      } else {
        context.setModalBody(response.error.message);
      }
    } else {
      let response = await apiSubmitNewList(
        context.user, title, links, isPrivate);

      if (response.status === 201) {
        navigate(`/list/${response.data.id}/`);
        navigate(0);
      } else {
        context.showMessageModal(response.error.message);
      }
    }
  }
  //////////////////////////////////////

  //////////////////////////////////////
  //  LINK OPERATIONS:
  //    ADD / EDIT / DELETE / GET
  //////////////////////////////////////
  const linkNotEmptyOrPresent = (url) => {
    if (url.replaceAll(' ', '') === '') {
      context.showMessageModal('Please enter a non-empty URL.');
      return false;
    }

    if (links.find((l) => l.url === formatURLInput(url))) {
      context.showMessageModal('This link is already in the list.')
      return false;
    }

    return true;
  }

  const linkAdd = async () => {
    if (linkNotEmptyOrPresent(newURL)) {
      let parsedURL = formatURLInput(newURL)
      
      // if link is not present in the db, add it
      if (!allLinks.find((l) => l.url === parsedURL)) {
        let response = await apiPostNewLink(context.user, parsedURL);
        // this will typically fail if the url is invalid
        if (response.response?.status >= 400) {
          const errorContents = JSON.parse(response.request.response);
          context.showMessageModal(
            errorContents.url !== undefined ? errorContents.url : response.message
          )
          return;
        }
      }
      setLinks([...links, {url: parsedURL, needsRendering: true}]);      
      setNewURL('');
    }
  }


  const linkDelete = (link) => {
    setLinks(links.filter((l) => {
      return l !== link;
    }));
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
    if (linkNotEmptyOrPresent(editedURL)) {
      let parsedURL = formatURLInput(editedURL);
      if (!allLinks.find((l) => l.url === parsedURL)) {
        apiPostNewLink(context.user, parsedURL);
        fetchAllLinks();
      }

      let newLinks = links.map((x) => x);
      newLinks[n] = {
        url: parsedURL,
        title: parsedURL,
        id: n,
        description: 'loading...',
        thumbnail: '',
        needsRendering: true
      };

      context.hideModal();
      setLinks(newLinks);
      setEditedURL('');
    }
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
            owner === context.user.username ?
            <>
              <h5 className = 'list-title-privacy'>{
              isPrivate ?
              'private list' : ''
              }</h5>
              <button 
                className='btn'
                onClick={() => {
                  navigate(`/edit/${match.params.id}/`);
              }}>Edit list</button>
            </> : <></>
          }
          { props.mode === 'view' ?
            <button 
              className='btn'
              onClick={() => {
                context.showMessageModal(
                  createShareModalBody(match.params.id, context.domainName)
                );
            }}>Share list</button> : <></>
          }
        </div>
      )
    )
  }

  const renderLinksPanel = () => { return (
      links.map((link, n) => { 
        if (link === undefined) {
          return <></>;
        }
        return (
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
              context.user.username === owner)
            ? (
            <div className='links-buttons' key={'links-buttons ' + n}>
              <button
                className='btn'
                key={`edit${n}`}
                onClick={
                  () => context.showQuestionModal(
                    <input
                      className='input-field input-field-large'
                      onChange = {onChangeEditedURL}
                      placeholder = 'Enter URL'
                    />,
                    'Save',
                    () => {
                      modalSave(n)
                    },
                    'Cancel',
                    () => {
                      setEditedURL('');
                      context.setModalBody();
                      context.hideModal();
                    }
                  )
                }>Edit</button>
              <button
                className='btn btn-delete'
                  key={`del${n}`}
                  onClick={
                    () => context.showQuestionModal(
                      'Are you sure you want to delete this link?',
                      'Yes',
                      () => {
                        linkDelete(link);
                        context.hideModal();
                      },
                      'No',
                    )
                  }>Delete</button>
            </div>): <></>
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

  const renderSaveListPanel = () => {
    return (
    (props.mode === 'new' ||
    (props.mode === 'edit' &&
      context.user.username === owner)) ? (
      <div className='panel save-list-panel'>
        <button
         className='btn btn-large'
         onClick={
          linkListSave
        }>Save LinkList</button>
      </div>): <></>
    )
  }

  const renderDeleteListPanel = () => {
    return (
    (props.mode === 'edit' &&
      context.user.username === owner) ? (
      <div className='panel'>
        <button
         className='btn btn-large btn-delete'
         onClick={
          () => context.showQuestionModal(
            'Are you sure you want to delete this linklist?',
            'Yes',
            async () => {
              await apiListDelete(match.params.id, context.user);
              context.hideModal();
              navigate('/myprofile/');
            },
            'No'
        )}>Delete LinkList</button>
      </div>): <></>
    )
  }
  //////////////////////////////////////

  let content = <h5>loading...</h5>

  if (isLoaded || props.mode === 'new') {
    if (props.mode === 'new' && context.user.username === null) {
      content = (
        <div className='error-message'>
          You are not logged in.
        </div>)
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
      </div>)
  }
  return (
    <div className='list-content'>
      {content}
    </div>)
}

export default LinkList;
