import React from 'react';
import { Link } from 'react-router-dom';
import {
  apiUserGet,
  apiUserLogout,
  apiListDelete,
} from './apiRequests';
import { Modal, closeModal } from './Modal';
import './style.css';


class UserPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoaded: false,
      isModalDisplayed: false,
    };
  }

  askDeleteList (id) {
    this.setState({
      isModalDisplayed: true,
      modalYesMethod: () => {
        apiListDelete(this, id);
        closeModal(this);
      },
      modalYesText: 'Yes',
      modalBody: 'Are you sure you want to delete this linklist?',
      modalNoText: 'No',
      modalNoMethod: () => closeModal(this),
    });
  }

  editList (id) {
    window.location.href = `/edit/${id}/`;
  }

  createNewList () {
    window.location.href = '/list/new/';
  }

  logout () {
    localStorage.removeItem('kodjalinkUsername');
    localStorage.removeItem('kodjalinkUserToken');

    apiUserLogout(this);
    window.location.href = '/login/';
  }

  render () {
    let mylists;

    if (!this.state.isLoaded) {
      mylists = <p><i>loading...</i></p>;
      apiUserGet(this);
    } else {
      if (this.state.linklists.length === 0) {
        mylists = (
          <div>
              <p>You have no linklists!</p>
            </div>    
        )
      } else {
        mylists = (
          <div>
            <ol className='mylists-list'>
              {this.state.linklists.map((el) => {
                return (
                  <li className='mylists-list-item' key={el.id}>
                    <Link
                      className='hyperlink'
                      to={`/list/${el.id}/`}
                    >{el.title}</Link>
                    <button
                      className='btn-userpanel-list-edit'
                      onClick={
                        () => this.editList(el.id)
                      }>Edit</button>
                    <button
                      className='btn btn-delete'
                      onClick={
                        () => this.askDeleteList(el.id)
                      }>Delete</button>
                  </li>
                )
              })}
            </ol>
          </div>
        )
      }
    }

    return (
      <div className='userpanel'>
        <div className='user-info'>
          <h3 className='user-info'>User Panel</h3>
          <button onClick={() => {
            window.location.href = '/myprofile/changepassword/';
          }}>Change password</button>
        </div>
        <div className='mylists-panel'>
          <h3 className='mylists-panel mylists-title'>My linklists:</h3>
          {mylists}
        </div>
        <button onClick={
          this.createNewList
        }>Create new linklist</button>
        <Modal
          show = {this.state.isModalDisplayed}
          modalYesMethod = {this.state.modalYesMethod}
          modalYesText = {this.state.modalYesText}
          modalNoMethod = {this.state.modalNoMethod}
          modalNoText = {this.state.modalNoText}
          body = {this.state.modalBody}
        />
    </div>
    )
  }
}

export default UserPanel;
