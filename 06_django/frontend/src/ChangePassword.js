import React from 'react';
import { apiChangePassword } from './apiRequests';
import './UserPanel';
import './style.css';

class ChangePassword extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPasswordOne: '',
      newPasswordTwo: '',
    }
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
      alert('Old password is required!');
    } else if (this.state.newPasswordOne === '' ||
          this.state.newPasswordTwo === '') {
      alert('New password is required!');
    } else if (this.state.newPasswordOne !== this.state.newPasswordTwo) {
      alert('New passwords don\'t match!');
    } else if (this.state.newPasswordOne === this.state.oldPassword) {
      alert('Your new password cannot be the same as your old password.');
    } else {
      apiChangePassword(this);
    }
  }

  render() {
  return (
    <div className='app-panel'>
    <h3>Change Password for {localStorage.getItem('kodjalinkUsername')}</h3>
    <div className='named-input'>
      <h5>Enter old password</h5>
      <input
        className='username-password-input-field'
        name='password'
        type='password'
        onChange={this.oldPasswordChange.bind(this)}
      />
    </div>
    <div className='named-input'>
      <h5>Enter new password</h5>
      <input
        className='username-password-input-field'
        name='password'
        type='password'
        onChange={this.newPasswordOneChange.bind(this)}
      />
    </div>
    <div className='named-input'>
      <h5>Confirm new password</h5>
      <input
        className='username-password-input-field'
        name='password'
        type='password'
        onChange={this.newPasswordTwoChange.bind(this)}
      />
    </div>
      <button onClick={this.submit.bind(this)}>
        Submit
      </button>
  </div>
  )
  }
}

export default ChangePassword;
