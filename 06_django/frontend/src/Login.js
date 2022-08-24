import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import { apiLoginUser } from './apiRequests';
import './style.css';

function Login (props) {
  const context = useOutletContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const submit = () => {
    apiLoginUser(username, password).then((response) => {
      if (response.status === 200) {
        context.user.setUserCredentials(username, response.data.key);
        navigate('/myprofile/');
      } else {
        const errorStatus = response.response.status;
        if (errorStatus === 400) {
          context.showMessageModal('Incorrect username or password!');
        } else if (errorStatus > 400) {
          context.showMessageModal(
            `${response.message}: ${response.response.statusText}`
          );
        }
      }
    });
  };

  return (
    <div className="panel">
      <h3>Login</h3>
      <div className="credentials-panel">
        <div className="prompt-and-input-field">
          <h5>Username</h5>
          <input
            className="input-field username-password-input-field"
            name="username"
            type="text"
            onChange={usernameChange}
          />
        </div>
        <div className="prompt-and-input-field">
          <h5>Password</h5>
          <input
            className="input-field username-password-input-field"
            name="password"
            type="password"
            onChange={passwordChange}
          />
        </div>
      </div>
      <button className="btn" onClick={submit}>
        Login
      </button>
    </div>
  );
}

export default Login;
