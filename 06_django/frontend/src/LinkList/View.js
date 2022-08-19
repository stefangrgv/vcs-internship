import React, { useState, useEffect } from 'react';
import { Link, useMatch, useNavigate, useOutletContext } from 'react-router-dom';

import { createShareModalBody } from '../Modal';
import { renderListTitlePanelView, linkMinimizeMaximize } from './functions';
import { apiGetAllLinks, apiLoadLinkList } from '../apiRequests';

import TitlePanel from './ListPanels/TitlePanel';
import LinkContents from './ListPanels/LinkContents';



const View = (props) => {
  const context = useOutletContext();
  const match = useMatch(`/${props.mode === 'edit' ? 'edit' : 'list'}/:id`);
  const navigate = useNavigate();

  const [isResponseOk, setResponseOk] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isFetchingLinks, setFetchingLinks] = useState(false);
  const [allLinks, setAllLinks] = useState([]);
  const [isPrivate, setPrivate] = useState(false);
  const [owner, setOwner] = useState('');
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const linkToggleMinimized = (id) => {
    let newLinks = links.slice();
    newLinks[id].isMinimized = !newLinks[id].isMinimized;
    setLinks(newLinks);
  }
  
  useEffect( () => {
    apiGetAllLinks(context.user, context.serverAddress)
    .then((response) => {
      setAllLinks(response.data);
      setFetchingLinks(false);
    });
    apiLoadLinkList(match.params.id, context.user, context.serverAddress)
    .then((response) => {
      setLinks(response.data.links);
      setTitle(response.data.title);
      setOwner(response.data.owner);
      setPrivate(response.data.isPrivate);
      //errorhandle
    })
  }, []);

  return(
    <>
    <TitlePanel mode='view' title={title} owner={owner} isPrivate={isPrivate}></TitlePanel>
    <LinkContents mode='view' links={links} linkToggleMinimized={linkToggleMinimized}></LinkContents>
    </>
  ) 
}
export default View;
