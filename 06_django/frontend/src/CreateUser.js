import React from 'react';
import './App.css';

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoOk: false,
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

    fetchAllUsers () {
        return fetch('http://localhost:8000/api/allusers/')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error in fetching data from server! Please check your connection.');
        })
        .then((data) => {
            return data.reduce((usernames, user) => {
                usernames.push(user['username']);
                return(usernames);
            }, []);
        })
        .catch((error) => {
            alert(error);
        })
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
        // check fields
        // get all usernames and check if user already exists
        this.fetchAllUsers().then((res) => {
            if (res.includes(this.state.username)) {
                alert('This username is already taken.')
                return // throw error instead
            }
            if (this.isPasswordOk() && this.isEmailOk()) {
                fetch('http://localhost:8000/api/createuser/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'username': this.state.username,
                        'password': this.state.passwordOne,
                        'email': this.state.email,
                    })
                })
                .then((response) => {
                    if (response.ok) {
                        window.location.href = '/myprofile/';
                    } else {
                        throw new Error('Server request failed!');
                    }
                })
                .catch((error) => {
                    alert(error);
                });
            }
        });
    }

    render() {
        let passwordInfo;
        passwordInfo = this.isPasswordOk() ? <></> : <h5 className='errorMessage'><b>Passwords do not match.</b></h5>;
        
        let emailInfo;
        emailInfo = this.isEmailOk() ? <></> : <h5 className='errorMessage'><b>Please enter a valid email.</b></h5>;

        return (
            <div className='CreateUser'>
            <h3>Register new user</h3>
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
                        onChange={this.passwordOneChange.bind(this)}
                    />
                </span>
                <span>
                    <h5>Repeat password</h5>
                    <input 
                        name='password'
                        type='password'
                        onChange={this.passwordTwoChange.bind(this)}
                    />
                    {passwordInfo}
                </span>
                <span>
                    <h5>Email</h5>
                    <input 
                        name='email'
                        type='text'
                        onChange={this.emailChange.bind(this)}
                    />
                    {emailInfo}
                </span>
                <span>
                    <button onClick={this.submit.bind(this)}>Register</button>
                </span>
            </div>
        )
  }
}

export default CreateUser;
