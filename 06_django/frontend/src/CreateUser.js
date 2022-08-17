import {
  React,
  useState
} from 'react';
import {
  useOutletContext,
  useNavigate,
} from 'react-router-dom';
import { apiPostNewUser } from './apiRequests';
import './style.css';


function CreateUser (props) {
  const context = useOutletContext();
  const navigate = useNavigate();
  let [username, setUsername] = useState('');
  let [passwordOne, setPasswordOne] = useState('');
  let [passwordTwo, setPasswordTwo] = useState('');
  let [email, setEmail] = useState('');

  const usernameChange = (event) => {
    setUsername(event.target.value);
  }

  const passwordOneChange = (event) => {
    setPasswordOne(event.target.value);
  }

  const passwordTwoChange = (event) => {
    setPasswordTwo(event.target.value);
  }

  const emailChange = (event) => {
    setEmail(event.target.value);
  }

  const isUsernameOk = () => {
    return (username !== '' && /^[a-z0-9]+$/i.test(username))
  }

  const isPasswordOk = () => {
    return ((passwordOne === passwordTwo &&
        passwordOne !== ''))
  }

  const isEmailOk = () => {
    return (email !== '' && /\S+@\S+\.\S+/.test(email))
  }

  const submit = async () => {
    let response = await apiPostNewUser(username, passwordOne, email);
    if (response.status === 201) {
      context.showMessageModal(`User ${username} created successfully! You can now login.`);
      context.setModalYesOnclick( () => () => {
        context.hideModal();
        navigate('/login/');
      } );
    } else {
      const errorContents = JSON.parse(response.request.response);
      let message;
      if (typeof(errorContents.username) !== 'undefined') {
        message = `Error in username field: ${errorContents.username}`;
      } else if (typeof(errorContents.email) !== 'undefined') {
        message = `Error in email field: ${errorContents.email}`;
      } else {
        message = errorContents;
      }
      context.showMessageModal(message);
    }
  }

  let userInfo = isUsernameOk() ? <></>
  : <div className='error-message'>Please enter a valid username.</div>;
  let passwordInfo = isPasswordOk() ? <></>
  : <div className='error-message'>Passwords do not match.</div>;
  let emailInfo = isEmailOk() ? <></>
  : <div className='error-message'>Please enter a valid email.</div>;

  return (
    <div className='panel'>
      <h3>Register new user</h3>
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
          onChange={passwordOneChange}
          />
        </div>
        <div className='prompt-and-input-field'>
          <h5>Repeat password</h5>
          <input
          className='input-field username-password-input-field'
          name='password'
          type='password'
          onChange={passwordTwoChange}
          />
        </div>
        <div className='prompt-and-input-field'>
          <h5>Email</h5>
          <input
          className='input-field username-password-input-field' 
          name='email'
          type='text'
          onChange={emailChange}
          />
      </div>
    {userInfo}
    {passwordInfo}
    {emailInfo}
    </div>
      <button
        className = 'btn'
        disabled = {!(isUsernameOk() && isPasswordOk() && isEmailOk())}
        onClick = {submit}
      >Register</button>
    </div>
  )
}

export default CreateUser;
