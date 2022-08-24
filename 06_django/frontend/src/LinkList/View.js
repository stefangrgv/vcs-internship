import React, { useState, useEffect } from 'react';
import { useMatch, useOutletContext } from 'react-router-dom';

import TitlePanel from './ListPanels/TitlePanel';
import ContentsPanel from './ListPanels/ContentsPanel';
import { fetchList } from './commonFunctions';

const View = (props) => {
  const context = useOutletContext();
  const match = useMatch(`/${props.mode === 'edit' ? 'edit' : 'list'}/:id`);

  const [isResponseOk, setResponseOk] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPrivate, setPrivate] = useState(false);
  const [owner, setOwner] = useState('');
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchList(
      match.params.id,
      context,
      setTitle,
      setLinks,
      setOwner,
      setPrivate,
      setResponseOk,
      setErrorMessage
    );
  }, []);

  if (isResponseOk) {
    return (
      <>
        <TitlePanel
          mode="view"
          id={match.params.id}
          title={title}
          owner={owner}
          isPrivate={isPrivate}
        ></TitlePanel>
        <ContentsPanel
          mode="view"
          links={links}
          setLinks={setLinks}
        ></ContentsPanel>
      </>
    );
  }
  return <div className="error-message">{errorMessage}</div>;
};
export default View;
