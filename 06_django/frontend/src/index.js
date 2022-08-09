import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
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
        <Route
          path='/'
          element = {<App
          user = {user}
          history = {createBrowserHistory()} />} >
          <Route
            exact path='/'
            element = {<Home
              user = {user} 
              history = {createBrowserHistory()} />} />
          <Route
            path = '/list/:id'
            element = {<LinkList
              user = {user}
              mode = 'view'
              history = {createBrowserHistory()} />} />
          <Route
            path = '/edit/:id'
            element = {<LinkList
              user = {user}
              mode = 'edit'
              history = {createBrowserHistory()} />} />
          <Route
            exact path = '/list/new/'
            element = {<LinkList
              user = {user}
              mode = 'new'
              history = {createBrowserHistory()} />} />
          <Route
            path = '/redirect/:url'
            element = {<Redirect
              user = {user}
              history = {createBrowserHistory()} />} />
          <Route
            exact path = '/login/'
            element = {<Login
              user = {user}
              history = {createBrowserHistory()} />} />
          <Route
            exact path = '/register/'
            element = {<CreateUser
              user = {user}
              history = {createBrowserHistory()} />} /> 
          <Route
            exact path = '/myprofile/'
            element = {<UserPanel
              user = {user}
              history = {createBrowserHistory()} />} />
          <Route
            exact path = '/myprofile/changepassword/'
            element = {<ChangePassword
              user={user}
              history = {createBrowserHistory()} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);