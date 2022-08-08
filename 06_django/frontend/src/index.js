import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App';
import Home from './Home';
import LinkList from './LinkList';
import Login from './Login';
import CreateUser from './CreateUser';
import UserPanel from './UserPanel';
import ChangePassword from './ChangePassword'
import Redirect from './Redirect';
import { apiUserLogout } from './apiRequests';
import './style.css';


class User {
  constructor () {
    this.getUsername();
  }

  getUsername () {
    this.username = localStorage.getItem('kodjalinkUsername');
    this.token = localStorage.getItem('kodjalinkUserToken');
  }

  logout () {
    localStorage.removeItem('kodjalinkUsername');
    localStorage.removeItem('kodjalinkUserToken');

    apiUserLogout();
  }
}

let user = new User();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App user={user} />} >
          <Route exact path='/' element={<Home user={user} />} />
          <Route path='/list/:id' element = {<LinkList user={user} mode = 'view' />} />
          <Route path='/edit/:id' element = {<LinkList user={user} mode = 'edit' />} />
          <Route exact path='/list/new/' element = {<LinkList user={user} mode='new' />} />
          <Route path='/redirect/:url' element = {<Redirect user={user} />} />
          <Route exact path='/login/' element={<Login user={user} />} />
          <Route exact path='/register/' element={<CreateUser user={user} />} /> 
          <Route exact path='/myprofile/' element={<UserPanel user={user} />} />
          <Route exact path='/myprofile/changepassword/' element={<ChangePassword user={user} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);