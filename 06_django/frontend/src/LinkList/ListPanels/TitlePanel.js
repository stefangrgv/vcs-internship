import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMatch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { createShareModalBody  } from '../../Modal';
import { apiSubmitNewList } from '../../apiRequests';

const TitlePanel = (props) => {
  const context = useOutletContext();
  const match = useMatch(`/${props.mode === 'edit' ? 'edit' : 'list'}/:id`);
  const navigate = useNavigate();

  const navigateToEdit = () => {
    navigate(`/edit/${match.params.id}/`);
  }

  const onClickShareLink = () => {
    context.showMessageModal(
      createShareModalBody(match.params.id, context.domainName));
  }

  const onChangeNewURL = (event) => {
    props.setNewURL(event.target.value);
  }

  const onChangeEditedURL = (event) => {
    props.setEditedURL(event.target.value); // useEffect() here
  }

  const onChangeTitle = (event) => {
    props.setTitle(event.target.value);
  }

  const onChangePrivacy = () => {
    props.setPrivate(!props.isPrivate);
  }

  const formatURLInput = (input) => {
    // Formats the URL to be properly handled by the DB
    let parsedURL = input.replace('www.', '');
    while (parsedURL.startsWith('/')) {
      parsedURL = parsedURL.slice(1);
    }
  
    if (!parsedURL.startsWith('http://') && !parsedURL.startsWith('https://')) {
      parsedURL = 'http://' + parsedURL;
    }
  
    if (parsedURL.endsWith('/')) { 
      parsedURL = parsedURL.slice(0, -1);
    }
  
    return parsedURL;
  }



  // const linkListSave = () => {
  //   if (props.title.replaceAll(' ', '') === '') {
  //     context.showMessageModal('Please enter a title!');
  //     return null
  //   }
  //   formatThumbnails();
  //   trimLinkTitle();
  //   apiSubmitNewList(
  //     context.user, props.title, props.links, props.isPrivate, context.serverAddress)
  //   .then((response) => {
  //     if (response.status === 201) {
  //       navigate(`/list/${response.data.id}/`);
  //       navigate(0);
  //     } else {
  //       context.showMessageModal(response.error.message);
  //     }
  //   });
  // }
  
  if (props.mode === 'view') {
    return (
      <div className='panel title-and-owner-panel'>
        <h3 className = 'list-title-privacy'>{props.title}</h3>
        {props.owner === context.user.username ?
          <><h5 className = 'list-title-privacy'>{
            props.isPrivate ? 'private list' : ''}</h5>
            <button
              className='btn'
              onClick={navigateToEdit}>Edit list</button>
          </> : <></> }
          <button 
            className='btn'
            onClick={onClickShareLink}>Share list</button>
      </div>)}

  return (
    <div className='panel title-and-owner-panel'>
      <h3>List title: </h3>
      <input
        className='input-field input-field-large'
        placeholder='Enter list title'
        onChange={onChangeTitle}
        value = {props.title}/>
    </div>)
}

export default TitlePanel;