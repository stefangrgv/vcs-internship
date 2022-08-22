import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import { apiPostNewUser } from './apiRequests';
import './style.css';


function CreateUser (props) {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [email, setEmail] = useState('');

  const usernameChange = (event) => {
    setUsername(event.target.value);
  }

  const passwordOneChange = (event) => {
    setPasswordOne(event.target.value);
  }

  const passwordTwoChange = (event) => {
    setPasswordTwo(event.target.value);
  }

  const emailChange = (event) => {
    setEmail(event.target.value);
  }

  const isUsernameOk = () => {
    return (username !== '' && /^[a-z0-9]+$/i.test(username))
  }

  const isPasswordOk = () => {
    return (passwordOne && (passwordOne === passwordTwo))
  }

  const isEmailOk = () => {
    return (email !== '' && /\S+@\S+\.\S+/.test(email))
  }

  const successOnclick = () => () => {
    context.setModalVisible(false);
    navigate('/login/');
  }

  const submit = () => {
    apiPostNewUser(username, passwordOne, email)
    .then((response) => {
      if (response.status === 201) {
        context.showMessageModal(
          `User ${username} created successfully! You can now login.`);
        context.setModalYesOnclick(successOnclick);
      } else {
        // show the error message
        const errorContents = JSON.parse(response.request.response);
        let message = errorContents;
        if (typeof(errorContents.username) !== 'undefined') {
          message = `Error in username field: ${errorContents.username}`;
        } else if (typeof(errorContents.email) !== 'undefined') {
          message = `Error in email field: ${errorContents.email}`;
        }
        context.showMessageModal(message);
      }
    });
  }

  return (
    <div className='panel'>
      <h3>Register new user</h3>
      <div className='credentials-panel'>
        <div className='prompt-and-input-field'>
          <h5>Username</h5>
          <input className='input-field username-password-input-field' name='username' type='text' onChange={usernameChange}/>
        </div>
        {!isUsernameOk() ? <div className='error-message'>Please enter a valid username.</div> : <></>}
        <div className='prompt-and-input-field'>
          <h5>Password</h5>
          <input  className='input-field username-password-input-field' name='password' type='password' onChange={passwordOneChange}/>
        </div>
        <div className='prompt-and-input-field'>
          <h5>Repeat password</h5>
          <input className='input-field username-password-input-field' name='password' type='password' onChange={passwordTwoChange}/>
        </div>
        {!isPasswordOk() ? <div className='error-message'>Passwords do not match.</div> : <></>}
        <div className='prompt-and-input-field'>
          <h5>Email</h5>
          <input className='input-field username-password-input-field' name='email' type='text' onChange={emailChange}/>
      </div>
      {!isEmailOk() ? <div className='error-message'>Please enter a valid email.</div> : <></>}
    </div>
    <button className='btn' disabled={!(isUsernameOk() && isPasswordOk() && isEmailOk())} onClick={submit}>Register</button>
  </div>)
}

export default CreateUser;
