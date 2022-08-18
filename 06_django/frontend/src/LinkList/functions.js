import { apiPostNewLink } from "../apiRequests";
import { fetchAllLinks } from "./requests";

const linkMinimizeMaximize = (id, links, setLinks) => {
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

const formatThumbnails = (links, setLinks) => {
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

const trimLinkTitle = (links, setLinks) => {
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
  }));
}

const isLinkNotEmptyOrPresent = (url, context, links) => {
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

const addLink = (context, allLinks, links, setLinks, newURL, setNewURL) => {
  if (isLinkNotEmptyOrPresent(newURL)) {
    let parsedURL = formatURLInput(newURL)
    // if link is not present in the db, add it
    if (!allLinks.find((l) => l.url === parsedURL)) {
      apiPostNewLink(context.user, parsedURL, context.serverAddress)
      .then((response) => {
        // response will typically yield an error if the url is invalid
        if (response.response?.status >= 400) {
          const errorContents = JSON.parse(response.request.response);
          context.showMessageModal(
            errorContents.url !== undefined ? errorContents.url : response.message)
          return;
        }
      });
    }
    setLinks([...links, {url: parsedURL, needsRendering: true}]); 
    setNewURL('');
  }
}

const deleteLink = (link, links, setLinks) => {
  setLinks(links.filter((l) => {
    return l !== link;
  }));
}

const updateLinkInfo = (url, allLinks) => {
  return allLinks.find((l) => {
    return (l.url === formatURLInput(url))
  })
}

const renderPrivacy = (isPrivate, onChangePrivacy) => {
  return (<div className='panel privacy-panel'>
    <h3>Is this a private list: </h3>
    <input
      type = 'checkbox'
      checked = {isPrivate}
      onChange = {onChangePrivacy}/>
  </div>)
}

const renderListTitlePanelView = (context, title, owner, isPrivate, navigateToEdit, onClickShareLink) => {
  return(<div className='panel title-and-owner-panel'>
      <h3 className = 'list-title-privacy'>{title}</h3>
      {owner === context.user.username ?
        <><h5 className = 'list-title-privacy'>{
          isPrivate ? 'private list' : ''}</h5>
          <button
            className='btn'
            onClick={navigateToEdit}>Edit list</button>
        </> : <></> }
        <button 
          className='btn'
          onClick={onClickShareLink}>Share list</button> : <></>
    </div>)
}

const renderListTitlePanelCreateEdit = (title, onChangeTitle) => {
  return(<div className='panel title-and-owner-panel'>
      <h3>List title: </h3>
      <input
        className='input-field input-field-large'
        placeholder='Enter list title'
        onChange={onChangeTitle}
        value = {title}/>
    </div>)
}

const saveLink = (n, context, editedURL, setEditedURL, links, setLinks, allLinks, setAllLinks, setFetchingLinks) => {
  if (isLinkNotEmptyOrPresent(editedURL)) {
    let parsedURL = formatURLInput(editedURL);
    if (!allLinks.find((l) => l.url === parsedURL)) {
      apiPostNewLink(context.user, parsedURL, context.serverAddress)
      .then((response) => {
        if (response.response?.status >= 400) {
          const errorContents = JSON.parse(response.request.response);
          context.showMessageModal(
            errorContents.url !== undefined ? errorContents.url : response.message)
          return;
        }
      });
      fetchAllLinks(context, setAllLinks, setFetchingLinks);
    }

    let newLinks = links.slice();
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

export {linkMinimizeMaximize, formatURLInput, formatThumbnails, trimLinkTitle,
  isLinkNotEmptyOrPresent, addLink, deleteLink, updateLinkInfo, renderPrivacy,
  renderListTitlePanelCreateEdit, renderListTitlePanelView, saveLink};