import React from 'react';
import { confirm } from 'react-confirm-box';
import {
  apiUserGet,
  apiUserLogout,
  apiListDelete,
} from './apiRequests'
import './App.css';

class UserPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  async askDeleteList (id) {
    const isDeleteConfirmed = await confirm('Are you sure you want to delete this list?');
    if (isDeleteConfirmed) {
      apiListDelete(this, id);
    }
  }

  editList (id) {
    window.location.href = `/edit/${id}/`;
  }

  createNewList () {
    window.location.href = '/new/';
  }

  logout () {
    localStorage.removeItem('kodjalinkUsername');
    localStorage.removeItem('kodjalinkUserToken');

    apiUserLogout();
    window.location.href = '/login/';
  }

  render () {
    let mylists;
    let email;

    if (!this.state.isLoaded) {
      email = <p><i>loading...</i></p>;
      mylists = <p><i>loading...</i></p>;
      apiUserGet(this, localStorage.getItem('kodjalinkUsername'));
    } else {
      email = <a>{this.state.email}</a>
      if (this.state.linklists.length == 0) {
        mylists = (
          <div className='mylists'>
              <p>You have no linklists!</p>
            </div>    
        )
      } else {
        mylists = (
          <div className='mylists'>
            <ol className='mylists_ol'>
              {this.state.linklists.map((el) => {
                return (
                  <li key={el.id}>
                    <a href={`/${el.id}/`}>{el.title}</a>
                    <button onClick={() => this.editList(el.id)}>Edit</button>
                    <button onClick={() => this.askDeleteList(el.id)}>Delete</button>
                  </li>
                )
              })}
            </ol>
          </div>
        )
      }
    }

    return (
      <div className='UserPanel'>
      <h2>User Panel</h2>
      <h3>Username: <b>
        {localStorage.getItem('kodjalinkUsername')}
      </b></h3>
      <button onClick={this.logout}>
        Logout
      </button>
      <h3><a href='/myprofile/changepassword/'>Change password</a></h3>
      <span>
          <h3>Email: </h3>{email}
      </span>
      <span>
        <h3>My linklists:</h3>
        {mylists}
      </span>
      <button onClick={this.createNewList}>Create new linklist</button>
    </div>
    )
  }
}

export default UserPanel;
