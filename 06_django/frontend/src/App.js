import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

class App extends React.Component {
    logout () {
      localStorage.removeItem('kodjalinkUserToken');
    }

    render() {
    return (
      <div className='App'>
        <h3>KodjaLink</h3>
        <Outlet />
        <a href='/login/'>Login</a> | {' '}
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}

export default App;
