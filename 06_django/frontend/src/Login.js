import React from 'react';
import {
    apiUserLogin
} from './apiRequests';
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
        this.setState({
            isResponseOk: false,
        })
        apiUserLogin(this);
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
