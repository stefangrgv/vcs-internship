import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  apiUserLogout
} from './apiRequests'
import './App.css';

class App extends React.Component {
    logout () {
      localStorage.removeItem('kodjalinkUsername');
      localStorage.removeItem('kodjalinkUserToken');

      apiUserLogout();
    }

    renderUserLoggedIn () {
      if (localStorage.getItem('kodjalinkUsername') === null) {
        return (
          <h4>Viewing as guest. Please {" "}
            <b><a href='/login/'>login</a></b> {" "}
            or <b><a href='/register/'>register</a></b>.
          </h4>
        );
      }
      return (
        <span>
            <h4>Logged in as {" "}
              <b>{localStorage.getItem('kodjalinkUsername')}</b>
            </h4>
            <h4><a href='/new/'> Create a new linklist</a> {" "}
             or <a href='/myprofile'> view your profile </a>.</h4>
            <button onClick={this.logout}>Logout</button>
          </span>
      );
    }

    render() {
      return (
        <div className='App'>
          <Outlet />
          {this.renderUserLoggedIn()}
        </div>
      )
  }
}

export default App;
