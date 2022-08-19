import React, { useState, useEffect } from 'react';
import { useMatch, useNavigate, useOutletContext } from 'react-router-dom';

import { apiGetAllLinks, apiLoadLinkList } from '../apiRequests';

import TitlePanel from './ListPanels/TitlePanel';
import LinkContents from './ListPanels/LinkContents';
import AddLinkPanel from './ListPanels/AddLinkPanel';
import SaveDeletePanel from './ListPanels/SaveDeletePanel';
import { fetchList } from './requests';

const CreateEdit = (props) => {
  const context = useOutletContext();
  const match = useMatch(`/${props.mode === 'edit' ? 'edit' : 'list'}/:id`);
  const navigate = useNavigate();

  const [isResponseOk, setResponseOk] = useState(false);
  const [isFetchingLinks, setFetchingLinks] = useState(false);
  const [editedURL, setEditedURL] = useState('');
  const [allLinks, setAllLinks] = useState([]);
  const [isPrivate, setPrivate] = useState(false);
  const [owner, setOwner] = useState('');
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [newURL, setNewURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAllLinks = () => {
    apiGetAllLinks(context.user, context.serverAddress)
    .then((response) => {
      setAllLinks(response.data);
      setFetchingLinks(false);
    });
  }

  const updateLinkInfo = (url) => {
    return allLinks.find((l) => {
      return (l.url === formatURLInput(url))
    })
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
    }));
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
    }));
  }

  useEffect( () => {
    apiGetAllLinks(context.user, context.serverAddress)
    .then((response) => {
      setAllLinks(response.data);
      setFetchingLinks(false);
    });
    if (props.mode === 'edit') {
      apiLoadLinkList(match.params.id, context.user, context.serverAddress)
      .then((response) => {
        setLinks(response.data.links);
        setTitle(response.data.title);
        setOwner(response.data.owner);
        setPrivate(response.data.isPrivate);
        //errorhandle
      })
    }
  }, []);

  useEffect( () => { // i don't like how this looks, without reading it
    if (links.find((l) => l.needsRendering &&
        !isFetchingLinks)) {
      setLinks(links.map((link) => {
        if (link.needsRendering) {
          let linkDbEntry = updateLinkInfo(link.url);
          if (linkDbEntry === undefined) {
            setFetchingLinks(true);
            fetchAllLinks();
            return link;
          }
          return linkDbEntry;
        } else {
          return link;
        }
      }));
    }
  });

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  const onChangePrivacy = () => {
    setPrivate(!isPrivate);
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

  const isLinkNotEmptyOrPresent = (url) => {
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
  
  return (
    <>
      <TitlePanel mode={props.mode} title={title} setTitle={setTitle}/>
      <LinkContents mode={props.mode} owner={owner} links={links}
        setLinks={setLinks} setEditedURL={setEditedURL}/>
      <AddLinkPanel
        allLinks={allLinks}
        links={links}
        setLinks={setLinks}
        isLinkNotEmptyOrPresent={isLinkNotEmptyOrPresent}
        formatURLInput={formatURLInput}/>
      <SaveDeletePanel
        title={title}
        links={links}
        isPrivate={isPrivate}
        formatThumbnails={formatThumbnails}
        trimLinkTitle={trimLinkTitle}/>
    </>
  )
}

export default CreateEdit;