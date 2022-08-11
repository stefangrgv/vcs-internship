import React from 'react';
import {
  apiUserLogin,
} from './apiRequests';
import { Modal } from './Modal';
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
      <div className='panel'>
        <h3>Login</h3>
        <div className='credentials-panel'>
          <div className='prompt-and-input-field'>
            <h5>Username</h5>
            <input 
            className='input-field username-password-input-field'
            name='username'
            type='text'
            onChange={this.usernameChange}
          />
          </div>
          <div className='prompt-and-input-field'>
            <h5>Password</h5>
            <input
              className='input-field username-password-input-field'
              name='password'
              type='password'
              onChange={this.passwordChange}
            />
          </div>
        </div>
        <button 
          className = 'btn'
          onClick={this.submit}
        >Login</button>
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

export default Login;
