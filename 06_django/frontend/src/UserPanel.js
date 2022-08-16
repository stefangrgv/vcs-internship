import { React, useState } from 'react';
import { Link, Navigate, useOutletContext } from 'react-router-dom';
import {
  apiUserGet,
  apiUserLogout,
  apiListDelete,
} from './apiRequests';
import {
  Modal,
  getShareListModalBody,
} from './Modal';
import './style.css';

function UserPanel (props) {
  const context = useOutletContext();
  let [isQuerySent, setQuerySent] = useState(false);
  let [linklists, setLinklists] = useState([]);

  const deleteList = async (id) => {
    const response = await apiListDelete(id, props.user);
    console.log(response);
    if (response.status === 204) {
      setQuerySent(false);
      context.setModalShow(true);
      context.setModalYesOnclick( () => () => hideModal);
      context.setModalYesText('OK');
      context.setModalNoText('');
      context.setModalBody('List deleted successfully.');
    } else {
      let message = response.error.message;
      if (response.response.status === 401) {
        message = 'You are not logged in.';
      } else if (response.response.status === 403) {
        message = 'Permission denied: you do not own this list.';
      } else if (response.response.status === 404) {
        message = 'List not found!';
      }
      context.setModalDisplayed(true);
      context.setModalYesOnclick( () => hideModal );
      context.setModalYesText('OK');
      context.setModalNoText('');
      context.setModalBody(message);
    }
  }

  const askDeleteList = (id) => {
    context.setModalShow(true);
    context.setModalYesText('Yes');
    context.setModalYesOnclick( () => async () => {
      await deleteList(id);
      hideModal();
      setQuerySent(false);
    } );
    context.setModalNoOnclick( () => hideModal );
    context.setModalNoText('No');
    context.setModalBody('Are you sure you want to delete this linklist?');
  }

  const hideModal = () => {
    context.setModalShow(false);
  }

  const editList = (id) => {
    // window.location.href = `/edit/${id}/`;
    console.log(`oops... i should go here: /edit/${id}/`)
  }

  const createNewList = () => {
    window.location.href = '/list/new/';
  }

  const logout = () => {
    localStorage.removeItem('kodjalinkUsername');
    localStorage.removeItem('kodjalinkUserToken');

    apiUserLogout();
    window.location.href = '/login/';
  }

  const loadUserData = async () => {
    let response = await apiUserGet(props.user.username, props.user.token);
    if (response.statusText === 'OK') {
      setLinklists(response.data.linklists);
    } else {
      context.setModalShow(true);
      context.setModalYesOnclick( () => hideModal );
      context.setModalYesText('OK');
      context.setModalNoText('');
      context.setModalBody(response.response.status === 401 ? 'You are not logged in!' : response.message);
    }
    setQuerySent(true);
  }

  const shareList = (id) => {
    context.setModalShow(true);
    context.setModalBody(getShareListModalBody(id, props.domainName));
    context.setModalNoText('');
    context.setModalYesOnclick( () => hideModal );
    context.setModalYesText('OK');
  }

  const renderMyLists = () => {
    if (!isQuerySent) {
      loadUserData();
      return <h4>loading...</h4>;
    } else {
      if (linklists.length === 0) {
        return (
          <div className='mylists-list'>
            <h4>You have no linklists!</h4>
          </div>    
        )
      } else {
        return (
          <div className='mylists-list'><ol>
            {linklists.map((el) => {
              return (
                <li className='mylists-list-item' key={el.id}>
                  <Link
                    className='hyperlink'
                    to={`/list/${el.id}/`}
                  >{el.title}</Link>
                  <button
                    className = 'btn'
                    onClick = {() => shareList(el.id) }>
                    Share
                  </button>
                  <button
                    className='btn'
                    onClick={
                      () => editList(el.id)
                    }>Edit</button>
                  <button
                    className='btn btn-delete'
                    onClick={
                      () => askDeleteList(el.id)
                    }>Delete</button>
                </li>
              )
            })}
          </ol></div>
        )
      }
    }}

  return (
    <div className='panel'>
      <div className='user-info'>
        <h3>User Panel</h3>
      </div>
      <div className='panel mylists-panel'>
        <h3>My linklists</h3>
        {renderMyLists()}
      </div>
      <button
        className='btn btn-large'
        onClick={
        createNewList
      }>Create new linklist</button>
      <button
          className='btn btn-large'
          onClick={() => {
          window.location.href = '/myprofile/changepassword/';
        }}>Change password</button>
    </div>
  )
}

export default UserPanel;
