import React from 'react';
import './UserPanel';
import './style.css'

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
    } else {
      fetch('http://localhost:8000/auth/password/change/', {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
          }),
        body: JSON.stringify({
          new_password1: this.state.newPasswordOne,
          new_password2: this.state.newPasswordTwo,
          old_password: this.state.oldPassword,
        })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 400) {
          throw new Error('Old password is not correct!');
        }
        throw new Error('Error in request to server.');
      })
      .then((data) => {
        alert('Success!')
      })
      .catch((error) => {
        alert(error)
      })
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
