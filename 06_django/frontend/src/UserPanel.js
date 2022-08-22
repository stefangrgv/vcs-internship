import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';

import { apiUserGet, apiListDelete } from './apiRequests';
import { createShareModalBody } from './Modal';
import './style.css';

function UserPanel (props) {
  const context = useOutletContext();
  const navigate = useNavigate();

  const [isQuerySent, setQuerySent] = useState(false);
  const [linklists, setLinklists] = useState([]);
  const [deleteListId, setDeleteListId] = useState(null);

  useEffect (() => {
    if (deleteListId !== null) {
      context.showQuestionModal('Are you sure you want to delete this linklist?', 'Yes', confirmDeleteList, 'No');
      setDeleteListId(null);
    } else {
      context.hideModal();
    }
  }, [deleteListId])

  const askDeleteList = (event) => {
    setDeleteListId(event.currentTarget.id);
  }

  const confirmDeleteList = () => () => {
    context.setModalVisible(false);
    setQuerySent(false);
    deleteList();
  }
  
  const deleteList = () => {
    apiListDelete(deleteListId, context.user)
    .then((response) => {
      if (response.status === 204) {
        setQuerySent(false);
      } else {
        let message = response.error.message;
        if (response.response.status === 401) {
          message = 'You are not logged in.';
        } else if (response.response.status === 403) {
          message = 'Permission denied: you do not own this list.';
        } else if (response.response.status === 404) {
          message = 'List not found!';
        }
        context.showMessageModal(message);
      }
    });
  }

  const loadUserData = () => {
    apiUserGet(context.user.username, context.user.token)
    .then((response) => {
      if (response.statusText === 'OK') {
        setLinklists(response.data.linklists);
      } else {
        context.showMessageModal(
          response.response.status === 401 ?
          'You are not logged in!' : response.message);
      }
      setQuerySent(true);
    });
  }

  const onClickShareList = (event) => {
    context.showMessageModal(
      createShareModalBody(event.currentTarget.id, context.domainName)
    );
  }

  const onClickEditList = (event) => {
    navigate(`/edit/${event.currentTarget.id}/`);
  }

  const navigateChangePassword = () => {
    navigate('/myprofile/changepassword/');
  }

  const navigateNewList = () => {
    navigate('/list/new/');
  }

  const renderMyLists = () => {
    if (!isQuerySent) {
      loadUserData();
      return <h4>loading...</h4>;
    }
    if (linklists.length === 0) {
      return (<h4>You have no linklists!</h4>)
    }
    return (<ol>{linklists.map((el) => {
      return (<li className='mylists-list-item' key={el.id}>
        <Link className='hyperlink' to={`/list/${el.id}/`}>{el.title}</Link>
        <button className='btn' id={el.id} onClick={onClickShareList}>Share</button>
        <button className='btn' id={el.id} onClick={onClickEditList}>Edit</button>
        <button className='btn btn-delete' id={el.id} onClick={askDeleteList}>Delete</button>
      </li>)
    })}</ol>)
  }

  return (<div className='panel'>
    <div className='user-info'><h3>User Panel</h3></div>
    <div className='panel mylists-panel'>
      <h3>My linklists</h3>
      <div className='mylists-list'>{renderMyLists()}</div>
    </div>
    <button className='btn btn-large' onClick={navigateNewList}>Create new linklist</button>
    <button className='btn btn-large' onClick={navigateChangePassword}>Change password</button>
  </div>)
}

export default UserPanel;
