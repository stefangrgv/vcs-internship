import React from 'react';
import {
  apiUserGet,
  apiUserLogout,
  apiListDelete,
} from './apiRequests';
import './style.css';


class UserPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  askDeleteList (id) {
    if (window.confirm('Are you sure you want to delete this list?')) {
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

    if (!this.state.isLoaded) {
      mylists = <p><i>loading...</i></p>;
      apiUserGet(this, localStorage.getItem('kodjalinkUsername'));
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
                    <a className='hyperlink' href={`/${el.id}/`}>{el.title}</a>
                    <button
                      className='btn-userpanel-list-edit'
                      onClick={
                        () => this.editList(el.id)
                      }>Edit</button>
                    <button
                      className='btn-userpanel-list-delete'
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
          <h4 className='user-info'>Logged in as {" "}
            {localStorage.getItem('kodjalinkUsername')}
          </h4>
          <button onClick={this.logout}>
            Logout
          </button>
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
    </div>
    )
  }
}

export default UserPanel;
