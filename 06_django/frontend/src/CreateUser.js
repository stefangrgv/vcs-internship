import React from 'react';
import {
  apiPostNewUser,
} from './apiRequests';
import './App.css';


class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      passwordOne: '',
      passwordTwo: '',
      email: '',
    }
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

  isPasswordOk () {
    if ((this.state.passwordOne !== '' || this.state.passwordTwo !== '')
        && this.state.passwordOne !== this.state.passwordTwo) {
      return false;
    }
    return true;
  }

  isEmailOk () {
    if (this.state.email !== '' && !/\S+@\S+\.\S+/.test(this.state.email)) {
      return false;
    }
    return true;
  }

  submit () {
    if (this.isPasswordOk() && this.isEmailOk()) {
      apiPostNewUser(this);
    }
  }

  render() {
    let passwordInfo = this.isPasswordOk() ? <></> : <h4 className='error-message'><b>Passwords do not match.</b></h4>;
    let emailInfo = this.isEmailOk() ? <></> : <h4 className='error-message'><b>Please enter a valid email.</b></h4>;

    return (
      <div className='app-panel'>
        <h3>Register new user</h3>
      <div className='named-input'>
        <h5>Username</h5>
        <input 
          className='username-password-input-field'
          name='username'
          type='text'
          onChange={this.usernameChange.bind(this)}
        />
      </div>
      <div className='named-input'>
        <h5>Password</h5>
        <input 
        className='username-password-input-field'
        name='password'
        type='password'
        onChange={this.passwordOneChange.bind(this)}
        />
      </div>
      <div className='named-input'>
        <h5>Repeat password</h5>
        <input
        className='username-password-input-field'
        name='password'
        type='password'
        onChange={this.passwordTwoChange.bind(this)}
        />
      </div>
      <div className='named-input'>
        <h5>Email</h5>
        <input
        className='username-password-input-field' 
        name='email'
        type='text'
        onChange={this.emailChange.bind(this)}
        />
        {passwordInfo}
        {emailInfo}
      </div>
        <button onClick={this.submit.bind(this)}>Register</button>
      </div>
    )
  }
}

export default CreateUser;
