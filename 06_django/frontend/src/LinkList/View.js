import { React, useState, useEffect } from 'react';
import { useMatch, useNavigate, useOutletContext } from 'react-router-dom';

import { fetchAllLinks, fetchList } from './requests';
import { formatThumbnails, trimLinkTitle,  } from './functions';
import { apiGetAllLinks } from '../apiRequests';

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

  useEffect( () => {
    apiGetAllLinks(context.user, context.serverAddress)
    .then((response) => {
      console.log(response.data)
      setAllLinks(response.data);
      setFetchingLinks(false);
    });
  }, []);

  return (
    <div>View</div>
  )
}

export default View;
