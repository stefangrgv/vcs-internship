import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { apiSubmitNewList, apiSubmitEditedList } from '../../apiRequests';
import { useMatch, useNavigate } from 'react-router-dom';
// apiPOSTnew/editedlist
// where is the new 
// add ifs
const SaveDeletePanel = (props) => {
  const context = useOutletContext();
  const navigate = useNavigate();
  const match = useMatch(`/${props.mode === 'edit' ? 'edit' : 'list'}/:id`);

  const saveList = () => {
    if (props.title.replaceAll(' ', '') === '') {
      context.showMessageModal('Please enter a title!');
      return null
    }
    
    props.formatThumbnails();
    props.trimLinkTitle();
    
    let request = props.mode === 'new' ?
    apiSubmitEditedList(match.params.id, context.user, props.title, props.links, props.isPrivate, context.serverAddress) :
    apiSubmitNewList(context.user, props.title, props.links, props.isPrivate, context.serverAddress)

    request.then((response) => {
      if (response.status === 200) {
        navigate(`/list/${match.params.id}/`);
      } else if (response.status === 201) {
        alert('6to ne navigira6 be? mai tr da e v gorniq component')
        navigate(`/list/${match.params.id}/`);
        navigate(0);
      }
      // } else {
      //   context.setModalBody(response.error.message);
      // }
    });
  }

  return (<div className='panel save-list-panel'>
    <button
    className='btn btn-large'
    onClick={saveList}>Save LinkList</button>
  </div>)
}

export default SaveDeletePanel;