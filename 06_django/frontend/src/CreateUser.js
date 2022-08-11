import React from 'react';
import {
  apiPostNewUser,
} from './apiRequests';
import { Modal } from './Modal';
import './style.css';


class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      passwordOne: '',
      passwordTwo: '',
      email: '',
    }

    this.usernameChange = this.usernameChange.bind(this);
    this.passwordOneChange = this.passwordOneChange.bind(this);
    this.passwordTwoChange = this.passwordTwoChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  usernameChange (event) {
    this.setState({
      username: event.target.value,
    });
  }

  passwordOneChange (event) {
    this.setState({
      passwordOne: event.target.value,
    });
  }

  passwordTwoChange (event) {
    this.setState({
      passwordTwo: event.target.value,
    });
  }

  emailChange (event) {
    this.setState({
      email: event.target.value,
    });
  }

  isUsernameOk () {
    return (this.state.username !== '' && /^[a-z0-9]+$/i.test(this.state.username))
  }

  isPasswordOk () {
    return ((this.state.passwordOne === this.state.passwordTwo &&
        this.state.passwordOne !== ''))
  }

  isEmailOk () {
    return (this.state.email !== '' && /\S+@\S+\.\S+/.test(this.state.email))
  }

  submit () {
    apiPostNewUser(this);
  }

  render() {
    let userInfo = this.isUsernameOk() ? <></> : <h4 className='error-message'><b>Please enter a valid username.</b></h4>;
    let passwordInfo = this.isPasswordOk() ? <></> : <h4 className='error-message'><b>Passwords do not match.</b></h4>;
    let emailInfo = this.isEmailOk() ? <></> : <h4 className='error-message'><b>Please enter a valid email.</b></h4>;

    return (
      <div className='panel'>
        <h3>Register new user</h3>
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
            onChange={this.passwordOneChange}
            />
          </div>
          <div className='prompt-and-input-field'>
            <h5>Repeat password</h5>
            <input
            className='input-field username-password-input-field'
            name='password'
            type='password'
            onChange={this.passwordTwoChange}
            />
          </div>
          <div className='prompt-and-input-field'>
            <h5>Email</h5>
            <input
            className='input-field username-password-input-field' 
            name='email'
            type='text'
            onChange={this.emailChange}
            />
        </div>
      {userInfo}
      {passwordInfo}
      {emailInfo}
      </div>
        <button
          className = 'btn'
          disabled = {!(this.isUsernameOk() && this.isPasswordOk() && this.isEmailOk())}
          onClick = {this.submit}
        >Register</button>
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

export default CreateUser;
