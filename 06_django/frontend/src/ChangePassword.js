import { React, useState} from 'react';
import { useOutletContext } from 'react-router-dom';
import { apiChangePassword } from './apiRequests';
import './UserPanel';
import { Modal } from './Modal';
import './style.css';


function ChangePassword (props) {
  const context = useOutletContext();
  let [oldPassword, setOldPassword] = useState('');
  let [newPasswordOne, setNewPasswordOne] = useState('');
  let [newPasswordTwo, setNewPasswordTwo] = useState('');

  const hideModal = () => {
    context.setModalShow(false);
  }

  const oldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  }

  const newPasswordOneChange = (event) => {
    setNewPasswordOne(event.target.value);
  }

  const newPasswordTwoChange = (event) => {
    setNewPasswordTwo(event.target.value);
  }

  const submit = async (event) => {
    if (oldPassword === '') {
      context.setModalShow(true);
      context.setModalYesOnclick( () => hideModal );
      context.setModalYesText('OK');
      context.setModalBody('Old password is required!');
    } else if (newPasswordOne === '' ||
        newPasswordTwo === '') {
      context.setModalShow(true);
      context.setModalYesOnclick( () => hideModal );
      context.setModalYesText('OK');
      context.setModalBody('New password is required!');
    } else if (newPasswordOne !== newPasswordTwo) {
      context.setModalShow(true);
      context.setModalYesOnclick( () => hideModal );
      context.setModalYesText( 'OK');
      context.setModalBody('New passwords don\'t match!');
    } else if (newPasswordOne === oldPassword) {
      context.setModalShow(true);
      context.setModalYesOnclick( () => hideModal );
      context.setModalYesText('OK');
      context.setModalBody('Your new password cannot be the same as your old password.');
    } else {
      let response = await apiChangePassword(props.user, oldPassword, newPasswordOne, newPasswordTwo);     
      if (response.status === 200) {
        context.setModalShow(true);
        context.setModalYesOnclick( () => () => {
          window.location.href = '/myprofile/';
        });
        context.setModalYesText('OK');
        context.setModalNoText('');
        context.setModalBody('Success!');
      } else {
        context.setModalShow(true);
        context.setModalYesOnclick( () => hideModal );
        context.setModalYesText('OK');
        context.setModalNoText('');
        context.setModalBody(response.response.status === 400 ? 'Old password is not correct!' : response.response.error);
      }
    }
  }

  return (
    <div className='panel'>
    <h3>Change Password for {localStorage.getItem('kodjalinkUsername')}</h3>
    <div className='credentials-panel'>
      <div className='prompt-and-input-field'>
        <h5>Enter old password</h5>
        <input
          className='input-field username-password-input-field'
          name='password'
          type='password'
          onChange={oldPasswordChange}
        />
      </div>
      <div className='prompt-and-input-field'>
        <h5>Enter new password</h5>
        <input
          className='input-field username-password-input-field'
          name='password'
          type='password'
          onChange={newPasswordOneChange}
        />
      </div>
      <div className='prompt-and-input-field'>
        <h5>Confirm new password</h5>
        <input
          className='input-field username-password-input-field'
          name='password'
          type='password'
          onChange={newPasswordTwoChange}
        />
      </div>
    </div>
      <button
        className='btn'
        onClick={submit}
      >Submit
      </button>
  </div>
  )
}

export default ChangePassword;
