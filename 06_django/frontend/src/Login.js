import React from 'react';
import {
  apiUserLogin,
} from './apiRequests';
import './style.css';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  usernameChange (event) {
    this.setState({
      username: event.target.value,
    });
  }

  passwordChange (event) {
    this.setState({
      password: event.target.value,
    });
  }

  submit(event) {
    this.setState({
      isResponseOk: false,
    })
    apiUserLogin(this);
  }

  render() {
    return (
      <div className='login-panel'>
        <h3 className='login-title'>Login</h3>
        <div className='named-input'>
          <h5>Username</h5>
          <input 
          className='username-password-input-field'
          name='username'
          type='text'
          onChange={this.usernameChange}
        />
        </div>
        <div className='named-input'>
          <h5>Password</h5>
          <input
            className='username-password-input-field'
            name='password'
            type='password'
            onChange={this.passwordChange}
          />
        </div>
        <button onClick={this.submit}>Login</button>
      </div>
    )
  }
}

export default Login;
