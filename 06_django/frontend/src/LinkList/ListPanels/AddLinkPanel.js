import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { apiPostNewLink } from '../../apiRequests';

import {
  formatURLInput,
  isLinkEmpty,
  isLinkAlreadyPresent,
} from '../commonFunctions';

const AddLinkPanel = (props) => {
  const context = useOutletContext();
  const [newURL, setNewURL] = useState('');

  const addLink = (url) => {
    props.setLinks([...props.links, { url: url, needsRendering: true }]);
    setNewURL('');
  };

  const requestAddLink = () => {
    if (isLinkEmpty(newURL)) {
      context.showMessageModal('Please enter a non-empty URL.');
      return;
    }
    if (isLinkAlreadyPresent(newURL, props.links)) {
      context.showMessageModal('This link is already in the list.');
      return;
    }
    const parsedURL = formatURLInput(newURL);
    // if link is not present in the db, add it
    if (!props.allLinks.find((l) => l.url === parsedURL)) {
      apiPostNewLink(context.user, parsedURL).then((response) => {
        if (response.status === 201) {
          addLink(parsedURL);
        } else {
          // response will typically yield an error if the url is invalid
          const errorContents = JSON.parse(response.request.response);
          context.showMessageModal(
            errorContents.url ? errorContents.url : response.message
          );
        }
      });
    } else {
      addLink(parsedURL);
    }
  };

  const onChangeNewURL = (event) => {
    setNewURL(event.target.value);
  };

  return (
    <div className="panel new-url-field">
      <h4>Add URL:</h4>
      <input
        className="input-field input-field-large"
        placeholder="Enter URL"
        onChange={onChangeNewURL}
        value={newURL}
      />
      <button className="btn" onClick={requestAddLink}>
        Add
      </button>
    </div>
  );
};

export default AddLinkPanel;
