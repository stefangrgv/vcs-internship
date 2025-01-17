import React, { useState, useEffect, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { apiPostNewLink } from '../../apiRequests';
import {
  formatURLInput,
  isLinkEmpty,
  isLinkAlreadyPresent,
} from '../commonFunctions';

import minimizeIcon from '../../img/minimize.png';
import maximizeIcon from '../../img/maximize.png';

function ListContentsPanel (props) {
  const context = useOutletContext();
  const [editedURL, setEditedURL] = useState('');
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const editInputRef = useRef('');

  const deleteLink = () => () => {
    props.setLinks(
      props.links.filter((l) => {
        return l !== props.links[deleteId];
      })
    );
    clearDeleteId()();
  };

  const clearDeleteId = () => () => {
    context.setModalVisible(false);
    setDeleteId(null);
  };

  const askDelete = (event) => {
    setDeleteId(event.currentTarget.id);
  };

  useEffect(() => {
    if (deleteId || deleteId === 0) {
      context.showQuestionModal(
        'Are you sure you want to delete this link?',
        'Yes',
        deleteLink,
        'No',
        clearDeleteId
      );
    } else {
      context.hideModal();
    }
  }, [deleteId]);

  const onChangeEditedURL = (event) => {
    setEditedURL(event.target.value);
    editInputRef.value = event.target.value;
  };

  const askEdit = (event) => {
    setEditId(event.currentTarget.id);
  };

  const clearEditId = () => () => {
    setEditId(null);
    setEditedURL('');
    editInputRef.value = '';
    context.setModalVisible(false);
  };

  const saveLink = (url) => {
    let newLinks = props.links.slice();
    newLinks[editId] = { url: url, needsRendering: true };
    props.setLinks(newLinks);
    clearEditId()();
  };

  const onclickSaveLink = () => () => {
    if (isLinkEmpty(editInputRef.value)) {
      context.showMessageModal('Please enter a non-empty URL.');
      clearEditId()();
      return;
    }
    if (isLinkAlreadyPresent(editInputRef.value, props.links)) {
      context.showMessageModal('This link is already in the list.');
      clearEditId()();
      return;
    }
    const parsedURL = formatURLInput(editInputRef.value);
    if (!props.allLinks.find((l) => l.url === parsedURL)) {
      apiPostNewLink(context.user, parsedURL).then((response) => {
        if (response.status === 201) {
          saveLink(parsedURL);
        } else {
          // response will typically yield an error if the url is invalid
          const errorContents = JSON.parse(response.request.response);
          context.showMessageModal(
            errorContents.url ? errorContents.url : response.message
          );
        }
      });
    } else {
      saveLink(parsedURL);
    }
  };

  useEffect(() => {
    if (editId || editId === 0) {
      context.showQuestionModal(
        <input
          ref={editInputRef}
          className="input-field input-field-large"
          defaultValue={editedURL}
          onChange={onChangeEditedURL}
          placeholder="Enter URL"
        />,
        'Save',
        onclickSaveLink,
        'Cancel',
        clearEditId
      );
    } else {
      context.hideModal();
    }
  }, [editId]);

  const makeEditDeleteButtons = (n) => {
    if (
      props.mode === 'new' ||
      (props.mode === 'edit' && context.user.username === props.owner)
    ) {
      return (
        <div className="links-buttons" key={'links-buttons ' + n}>
          <button className="btn" key={`edit${n}`} id={n} onClick={askEdit}>
            Edit
          </button>
          <button
            className="btn btn-delete"
            key={`del${n}`}
            id={n}
            onClick={askDelete}
          >
            Delete
          </button>
        </div>
      );
    }
  };

  const linkToggleMinimized = (event) => {
    let newLinks = props.links.slice();
    newLinks[event.currentTarget.id].isMinimized =
      !newLinks[event.currentTarget.id].isMinimized;
    props.setLinks(newLinks);
  };

  return (
    <div>
      {props.links.map((link, n) => {
        // link contents: title, description, thumbnail and url
        return (
          <div className="link-content" key={'link-content' + n}>
            <div className="link-title" key={'title' + n}>
              <h4 key={`num${n}`}> {link.title}</h4>
              {link.isMinimized ? (
                <button
                  id={n}
                  className="img-btn img-btn-btn"
                  onClick={linkToggleMinimized}
                >
                  <img className="img-btn" alt="maximize" src={maximizeIcon} />
                </button>
              ) : (
                <button
                  id={n}
                  className="img-btn img-btn-btn"
                  onClick={linkToggleMinimized}
                >
                  <img className="img-btn" alt="minimize" src={minimizeIcon} />
                </button>
              )}
            </div>
            {link.isMinimized ? (
              <></>
            ) : (
              <div className="link-description" key={'desc' + n}>
                <img
                  className="link-thumbnail"
                  src={link.thumbnail}
                  alt={link.url + ' thumbnail'}
                />
                <h5>{link.description}</h5>
              </div>
            )}
            <div className="link-hyperlink" key={'hlink' + n}>
              <h4>
                <Link
                  className="hyperlink"
                  key={`url${n}`}
                  to={`/redirect/${encodeURIComponent(link.url)}`}
                  target="_blank"
                >
                  {link.url}
                </Link>
              </h4>
            </div>
            {makeEditDeleteButtons(n)}
          </div>
        );
      })}
    </div>
  );
}

export default ListContentsPanel;
