import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import { apiChangePassword } from './apiRequests';
import './style.css';


function ChangePassword (props) {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPasswordOne, setNewPasswordOne] = useState('');
  const [newPasswordTwo, setNewPasswordTwo] = useState('');

  const oldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const newPasswordOneChange = (event) => {
    setNewPasswordOne(event.target.value);
  };

  const newPasswordTwoChange = (event) => {
    setNewPasswordTwo(event.target.value);
  };

  const onClickSuccess = () => () => {
    context.hideModal();
    navigate('/myprofile/');
  };

  const submit = () => {
    if (oldPassword === '') context.showMessageModal('Old password is required!');
    else if (newPasswordOne === '' || newPasswordTwo === '') context.showMessageModal('New password is required!');
    else if (newPasswordOne !== newPasswordTwo) context.showMessageModal('New passwords don\'t match!');
    else if (newPasswordOne === oldPassword) context.showMessageModal('Your new password cannot be the same as your old password.');
    else {
      apiChangePassword(context.user, oldPassword, newPasswordOne, newPasswordTwo).then((response) => {
        if (response.status === 200) {
          context.showMessageModal('Success!');
          context.setModalYesOnclick(onClickSuccess);
        } else {
          context.showMessageModal(response.response.status === 400 ? 'Old password is not correct!' : response.response.error);
        }
      });
    }
  };

  return (<div className='panel'>
    <h3>Change Password for {context.user.username}</h3>
    <div className='credentials-panel'>
      <div className='prompt-and-input-field'>
        <h5>Enter old password</h5>
        <input className='input-field username-password-input-field' name='password' type='password' onChange={oldPasswordChange}/>
      </div>
      <div className='prompt-and-input-field'>
        <h5>Enter new password</h5>
        <input className='input-field username-password-input-field' name='password' type='password' onChange={newPasswordOneChange}/>
      </div>
      <div className='prompt-and-input-field'>
        <h5>Confirm new password</h5>
        <input className='input-field username-password-input-field' name='password' type='password' onChange={newPasswordTwoChange}/>
      </div>
    </div>
    <button className='btn' onClick={submit}>Submit</button>
  </div>);
}

export default ChangePassword;
