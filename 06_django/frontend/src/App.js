import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

class App extends React.Component {
    logout () {
      localStorage.removeItem('kodjalinkUsername');
      localStorage.removeItem('kodjalinkUserToken');
      window.location.reload(false);
    }

    renderUserLoggedIn () {
      if (localStorage.getItem('kodjalinkUsername') === null) {
        return (
          <h4>Viewing as guest. Please <b><a href='/login/'>login</a></b> or <b><a href='/register/'>register</a></b>.</h4>
        );
      }
      return (
        <span>
            <h4>Logged in as <b>{localStorage.getItem('kodjalinkUsername')}</b></h4>
            <h4><a href='/new/'>Create a new linklist</a> or <a href='/myprofile'>view your profile</a>.</h4>
            <button onClick={this.logout}>Logout</button>
          </span>
      );
    }

    render() {
      let userInfo = this.renderUserLoggedIn();

      return (
        <div className='App'>
          <h3>KodjaLink</h3>
          <Outlet />
          {userInfo}
        </div>
      )
  }
}

export default App;
