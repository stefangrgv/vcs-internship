import React from 'react';
import { Navigate } from 'react-router-dom'
import './App.css';

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
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
            window.location.href = '/';
        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    render() {
    return (
        <div className='Login'>
        <h3>Login</h3>
        <span>
        <h5>Username</h5>
        <input 
            name='username'
            type='text'
            onChange={this.usernameChange.bind(this)}
        />
        </span>
        <span>
            <h5>Password</h5>
            <input 
                name='password'
                type='password'
                onChange={this.passwordChange.bind(this)}
            />
        </span>
        <span>
            <button onClick={this.submit.bind(this)}>Login</button>
        </span>
      </div>
    )
  }
}

export default Login;
