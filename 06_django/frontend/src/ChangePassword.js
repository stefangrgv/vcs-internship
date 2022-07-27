import React from 'react';
import './App.css';

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
        fetch('http://localhost:8000/auth/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': this.state.username,
                'password': this.state.password,
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            localStorage.setItem('kodjalinkUsername', this.state.username);
            localStorage.setItem('kodjalinkUserToken', data.token);
        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    render() {
    return (
        <div className='ChangePassword'>
        <h3>ChangePassword ###incomplete</h3>
        <span>
            <h5>Enter old password</h5>
            <input 
                name='password'
                type='password'
                onChange={this.oldPasswordChange.bind(this)}
            />
        </span>
        <span>
            <h5>Enter new password</h5>
            <input 
                name='password'
                type='password'
                onChange={this.newPasswordOneChange.bind(this)}
            />
        </span>
        <span>
            <h5>Confirm new password</h5>
            <input 
                name='password'
                type='password'
                onChange={this.newPasswordTwoChange.bind(this)}
            />
        </span>
        <span>
            <button onClick={this.submit.bind(this)}>Submit</button>
        </span>
      </div>
    )
  }
}

export default ChangePassword;
