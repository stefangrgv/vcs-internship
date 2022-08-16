import { React, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { apiUserLogin } from './apiRequests';
import './style.css';

function Login (props) {
  const context = useOutletContext();
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  const hideModal = () => {
    context.setModalShow(false);
  }

  const usernameChange = (event) => {
    setUsername(event.target.value);
  }

  const passwordChange = (event) => {
    setPassword(event.target.value);
  }

  const submit = async (event) => {
    let response = await apiUserLogin(username, password);
    if (response.statusText === 'OK') {
      localStorage.setItem('kodjalinkUsername', username);
      localStorage.setItem('kodjalinkUserToken', response.data.key);
      window.location.href = '/myprofile/';
    } else {
      let message = response.message;
      if (response.response.status === 400) {
        message = 'Incorrect username or password!';
      } else if (response.response.status > 400) {
        message = 'Error in request to server.';
      }
      
      context.setModalShow(true);
      context.setModalYesText('OK');
      context.setModalYesOnclick( () => hideModal );
      context.setModalNoText('');
      context.setModalBody(message);
    }
  }

  return (
    <div className='panel'>
      <h3>Login</h3>
      <div className='credentials-panel'>
        <div className='prompt-and-input-field'>
          <h5>Username</h5>
          <input 
          className='input-field username-password-input-field'
          name='username'
          type='text'
          onChange={usernameChange}
        />
        </div>
        <div className='prompt-and-input-field'>
          <h5>Password</h5>
          <input
            className='input-field username-password-input-field'
            name='password'
            type='password'
            onChange={passwordChange}
          />
        </div>
      </div>
      <button 
        className = 'btn'
        onClick={submit}
      >Login</button>
    </div>
  )
}

export default Login;
