import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import { apiPostNewList, apiPutEditedList, apiDeleteList } from '../../apiRequests';

const SaveDeletePanel = (props) => {
  const context = useOutletContext();
  const navigate = useNavigate();

  const saveList = () => {
    if (props.title.replaceAll(' ', '') === '') {
      context.showMessageModal('Please enter a title!');
      return null;
    }
    
    props.formatThumbnails();
    props.trimLinkTitle();
    
    let request = props.mode === 'new' ?
    apiPostNewList(context.user, props.title, props.links, props.isPrivate) :
    apiPutEditedList(props.id, context.user, props.title, props.links, props.isPrivate);

    request.then((response) => {
      if (response.status === 200) {  // edited
        navigate(`/list/${props.id}/`);
      } else if (response.status === 201) {  // created new
        navigate(`/list/${response.data.id}/`);
      } else {
        context.showMessageModal(response.error.message);
      }
    });
  };

  const deleteList = () => () => {
    apiDeleteList(props.id, context.user).then((response) => {
      context.hideModal();
      if (response.status === 204) { 
        navigate('/myprofile/');
      } else if (response.response.status === 401) {
        context.showMessageModal('Error: you are not logged in.');
      } else if (response.response.status === 403) {
        context.showMessageModal('Error: you do not own this list.');
      } else {
        context.showMessageModal(`${response.message}: ${response.response.statusText}`);
      }
    });
  };

  const askDeleteList = (event) => {
    context.showQuestionModal('Are you sure you want to delete this linklist?', 'Yes', deleteList, 'No');
  };

  return (<div className='panel save-list-panel'>
    <button className='btn btn-large' onClick={saveList}>Save LinkList</button>
    <button className='btn btn-large btn-delete' onClick={askDeleteList}>Delete LinkList</button>
  </div>);
};

export default SaveDeletePanel;