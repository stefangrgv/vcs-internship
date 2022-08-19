import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import minimizeIcon from '../../img/minimize.png';
import maximizeIcon from '../../img/maximize.png';
//its LIST CONTENTS PANEL
function LinkContents(props) {
  const context = useOutletContext();
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const onChangeEditedURL = (event) => {
    props.setEditedURL(event.target.value);
  }

  const askEdit = (event) => {
    setEditId(event.currentTarget.id);
  }

  const askDelete = (event) => {
    setDeleteId(event.currentTarget.id);
  }

  useEffect ( () => {
    if (editId !== null){
      context.showQuestionModal(
      <input
        className='input-field input-field-large'
        onChange = {onChangeEditedURL}
        placeholder = 'Enter URL'
      />,
      'Save',
      context.hideModal,
      // () => {
      //   modalSave(n)
      // },
      'Cancel',
      context.hideModal,
      // () => {
      //   setEditedURL('');
      //   context.setModalBody();
      //   context.hideModal();
      // }
    )
    setEditId(null);
    }
  }, [editId])

  useEffect( () => {
    if (deleteId !== null) {
      context.showQuestionModal(
      'Are you sure you want to delete this link?',
      'Yes',
      context.hideModal,
      // () => {
      //   deleteLink(link);
      //   context.hideModal();
      // },
      'No')
      setDeleteId(null);
    }
  }, [deleteId]);

  // const askDelete = () => 


  const makeEditDeleteButtons = (n) => {
    if (props.mode === 'new' ||
      (props.mode === 'edit' && context.user.username === props.owner)) {
        console.log('makin')
        return (<div className='links-buttons' key={'links-buttons ' + n}>
          <button
            className='btn'
            key={`edit${n}`}
            id={n}
            onClick={askEdit}>Edit</button>
          <button
            className='btn btn-delete'
              key={`del${n}`}
              id={n}
              onClick={askDelete}>Delete</button>
        </div>)
      }
  }

  return (
    <div>
    {props.links.map((link, n) => {
      // link contents: title, description, thumbnail and url
      return (<div className='link-content' key={'link-content' + n}>
        <div className='link-title' key={'title' + n}>
          <h4 key={`num${n}`}> {link.title}</h4>
          {link.isMinimized ?
          <button
            className = 'img-btn img-btn-btn'
            onClick = {() => props.linkToggleMinimized(n)}>  {/* useEffect */}
          <img
            className = 'img-btn'
            alt = 'maximize'
            src = {maximizeIcon}/></button> :
          <button
            className = 'img-btn img-btn-btn'
            onClick = {() => props.linkToggleMinimized(n)}>  {/* useEffect */}
          <img
            className = 'img-btn'
            alt = 'minimize'
            src = {minimizeIcon}/></button>}
        </div>
        {link.isMinimized ? <></>:
          <div className='link-description' key={'desc' + n}>
            <img className='link-thumbnail'
            src={link.thumbnail}
            alt={link.url + ' thumbnail'}
            />
            <h5>{link.description}</h5>
          </div>}
        <div className='link-hyperlink' key={'hlink' + n}>
          <h4><Link 
            className='hyperlink'
            key={`url${n}`}
            to = {`/redirect/${encodeURIComponent(link.url)}`}
            target = '_blank'>{link.url}</Link></h4>
        </div>
        {makeEditDeleteButtons(n)}
      </div>)})}
  </div>
  )
}

export default LinkContents;