import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  apiUserLogout
} from './apiRequests'
import './style.css';

class App extends React.Component {
    logout () {
      localStorage.removeItem('kodjalinkUsername');
      localStorage.removeItem('kodjalinkUserToken');

      apiUserLogout();
    }

    renderFooter () {
      if (localStorage.getItem('kodjalinkUsername') === null) {
        return (
          <h4>Viewing as guest. Please {" "}
            <b><a href='/login/'>login</a></b> {" "}
            or <b><a href='/register/'>register</a></b>.
          </h4>
        );
      }
      return (
        <div className='footer'>
            <h4>Logged in as {" "}
              <b>{localStorage.getItem('kodjalinkUsername')}</b>
            </h4>
            <h4><a
              className='hyperlink'
              href='/new/'
            >Create a new linklist</a>
            {" "} or <a
              className='hyperlink'
              href='/myprofile'
            >view your profile </a>.</h4>
            <button onClick={this.logout}>Logout</button>
          </div>
      );
    }

    render() {
      return (
        <div className='App'>
          <h2 className='site-title'>KodjaLink</h2>
          <h5 className='site-description'>The best website for sharing lists of links.</h5>
          <Outlet />
          {this.renderFooter()}
        </div>
      )
  }
}

export default App;
