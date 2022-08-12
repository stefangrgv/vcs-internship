import React from 'react';
import { apiChangePassword } from './apiRequests';
import './UserPanel';
import { Modal, closeModal } from './Modal';
import './style.css';


class ChangePassword extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPasswordOne: '',
      newPasswordTwo: '',
    }

    this.oldPasswordChange = this.oldPasswordChange.bind(this);
    this.newPasswordOneChange = this.newPasswordOneChange.bind(this);
    this.newPasswordTwoChange = this.newPasswordTwoChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  oldPasswordChange (event) {
    this.setState({
      oldPassword: event.target.value,
    });
  }

  newPasswordOneChange (event) {
    this.setState({
      newPasswordOne: event.target.value,
    });
  }

  newPasswordTwoChange (event) {
    this.setState({
      newPasswordTwo: event.target.value,
    });
  }

  submit(event) {
    if (this.state.oldPassword === '') {
      this.setState({
        isModalDisplayed: true,
        modalYesMethod: () => closeModal(this),
        modalYesText: 'OK',
        modalBody: 'Old password is required!',
      });
    } else if (this.state.newPasswordOne === '' ||
          this.state.newPasswordTwo === '') {
            this.setState({
              isModalDisplayed: true,
              modalYesMethod: () => closeModal(this),
              modalYesText: 'OK',
              modalBody: 'New password is required!'
            });
    } else if (this.state.newPasswordOne !== this.state.newPasswordTwo) {
      this.setState({
        isModalDisplayed: true,
        modalYesMethod: () => closeModal(this),
        modalYesText: 'OK',
        modalBody: 'New passwords don\'t match!'
      });
    } else if (this.state.newPasswordOne === this.state.oldPassword) {
      this.setState({
        isModalDisplayed: true,
        modalYesMethod: () => closeModal(this),
        modalYesText: 'OK',
        modalBody: 'Your new password cannot be the same as your old password.'
      });
    } else {
      apiChangePassword(this);
    }
  }

  render() {
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
          onChange={this.oldPasswordChange}
        />
      </div>
      <div className='prompt-and-input-field'>
        <h5>Enter new password</h5>
        <input
          className='input-field username-password-input-field'
          name='password'
          type='password'
          onChange={this.newPasswordOneChange}
        />
      </div>
      <div className='prompt-and-input-field'>
        <h5>Confirm new password</h5>
        <input
          className='input-field username-password-input-field'
          name='password'
          type='password'
          onChange={this.newPasswordTwoChange}
        />
      </div>
    </div>
      <button
        className='btn'
        onClick={this.submit}
      >Submit
      </button>
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

export default ChangePassword;
