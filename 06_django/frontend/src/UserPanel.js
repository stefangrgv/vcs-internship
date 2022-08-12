import React from 'react';
import { Link } from 'react-router-dom';
import {
  apiUserGet,
  apiUserLogout,
  apiListDelete,
} from './apiRequests';
import {
  Modal,
  closeModal,
  shareList,
} from './Modal';
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
      mylists = <h4>loading...</h4>;
      apiUserGet(this);
    } else {
      if (this.state.linklists.length === 0) {
        mylists = (
          <div className='mylists-list'>
              <h4>You have no linklists!</h4>
            </div>    
        )
      } else {
        mylists = (
          <div className='mylists-list'>
            <ol>
              {this.state.linklists.map((el) => {
                return (
                  <li className='mylists-list-item' key={el.id}>
                    <Link
                      className='hyperlink'
                      to={`/list/${el.id}/`}
                    >{el.title}</Link>
                    <button
                      className = 'btn'
                      onClick = {() => shareList(this, el.id, this.props.domainName) }>
                      Share
                    </button>
                    <button
                      className='btn'
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
      <div className='panel'>
        <div className='user-info'>
          <h3>User Panel</h3>
        </div>
        <div className='panel mylists-panel'>
          <h3>My linklists</h3>
          {mylists}
        </div>
        <button
          className='btn btn-large'
          onClick={
          this.createNewList
        }>Create new linklist</button>
        <button
            className='btn btn-large'
            onClick={() => {
            window.location.href = '/myprofile/changepassword/';
          }}>Change password</button>
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
