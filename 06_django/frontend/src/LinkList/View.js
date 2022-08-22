import React, { useState, useEffect } from 'react';
import { useMatch, useOutletContext } from 'react-router-dom';

import TitlePanel from './ListPanels/TitlePanel';
import LinkContents from './ListPanels/LinkContents';
import { apiGetAllLinks, apiLoadLinkList } from '../apiRequests';

const View = (props) => {
  const context = useOutletContext();
  const match = useMatch(`/${props.mode === 'edit' ? 'edit' : 'list'}/:id`);

  const [isFetchingLinks, setFetchingLinks] = useState(false);
  const [allLinks, setAllLinks] = useState([]);
  const [isPrivate, setPrivate] = useState(false);
  const [owner, setOwner] = useState('');
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect( () => {
    apiGetAllLinks(context.user)
    .then((response) => {
      setAllLinks(response.data);
      setFetchingLinks(false);
    });
    apiLoadLinkList(match.params.id, context.user)
    .then((response) => {
      setLinks(response.data.links);
      setTitle(response.data.title);
      setOwner(response.data.owner);
      setPrivate(response.data.isPrivate);
      //errorhandle
    })
  }, []);

  return(<>
    <TitlePanel mode='view' id={match.params.id} title={title} owner={owner} isPrivate={isPrivate}></TitlePanel>
    <LinkContents mode='view' links={links} setLinks={setLinks}></LinkContents>
  </>) 
}
export default View;
