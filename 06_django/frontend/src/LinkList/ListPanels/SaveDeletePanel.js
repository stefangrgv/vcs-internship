import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { apiSubmitNewList, apiSubmitEditedList } from '../../apiRequests';
import { useNavigate } from 'react-router-dom';

// apiPOSTnew/editedlist
// where is the new 
// add ifs
const SaveDeletePanel = (props) => {
  const context = useOutletContext();
  const navigate = useNavigate();

  const saveList = () => {
    if (props.title.replaceAll(' ', '') === '') {
      context.showMessageModal('Please enter a title!');
      return null
    }
    
    props.formatThumbnails();
    props.trimLinkTitle();
    
    let request = props.mode === 'new' ?
    apiSubmitNewList(context.user, props.title, props.links, props.isPrivate) :
    apiSubmitEditedList(props.id, context.user, props.title, props.links, props.isPrivate)

    request.then((response) => {
      if (response.status === 200) {  // newly created
        navigate(`/list/${props.id}/`);
      } else if (response.status === 201) { // edit saved
        navigate(`/list/${props.id}/`);
        navigate(0);
      }
      // } else {
      //   context.setModalBody(response.error.message);
      // }
    });
  }

  const deleteList = () => {

  }

  const askDeleteList = (event) => {

  }

  return (<div className='panel save-list-panel'>
    <button
    className='btn btn-large'
    onClick={saveList}>Save LinkList</button>
    <button
    className='btn btn-large btn-delete'
    onClick={askDeleteList}>Delete LinkList</button>
  </div>)
}

export default SaveDeletePanel;