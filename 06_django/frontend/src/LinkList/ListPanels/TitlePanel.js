import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import { createShareModalBody } from '../../Modal';

const TitlePanel = (props) => {
  const context = useOutletContext();
  const navigate = useNavigate();

  const navigateToEdit = () => {
    navigate(`/edit/${props.id}/`);
  };

  const onClickShareLink = () => {
    context.showMessageModal(
      createShareModalBody(props.id, context.domainName)
    );
  };

  const onChangeTitle = (event) => {
    props.setTitle(event.target.value);
  };

  const onChangePrivacy = () => {
    props.setPrivate((prev) => !prev);
  };

  if (props.mode === 'view') {
    return (
      <div className="panel title-and-owner-panel">
        <h3 className="list-title-privacy">{props.title}</h3>
        {props.isPrivate
        ? <h4 className="list-title-privacy">private list</h4>
        : <></>
        }
        {props.owner === context.user.username 
        ? <button className="btn" onClick={navigateToEdit}>
            Edit list
          </button>
        : <></>
        }
        <button className="btn" onClick={onClickShareLink}>
          Share list
        </button>
      </div>
    );
  }

  return (
    <div className="panel title-and-owner-panel">
      <h3>List title:</h3>
      <input
        className="input-field input-field-large"
        placeholder="Enter list title"
        onChange={onChangeTitle}
        value={props.title}
      />
      <div className="panel privacy-panel">
        <input
          type="checkbox"
          checked={props.isPrivate}
          onChange={onChangePrivacy}
        />
        <h3>Private list</h3>
      </div>
    </div>
  );
};

export default TitlePanel;
