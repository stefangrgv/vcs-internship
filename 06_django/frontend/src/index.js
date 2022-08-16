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
import PageNotFound from './PageNotFound';
import { apiUserLogout } from './apiRequests';
import './style.css';


const domainName = window.location.origin;

class User {
  constructor () {
    this.getUsername();
  }

  getUsername () {
    this.username = localStorage.getItem('kodjalinkUsername');
    this.token = localStorage.getItem('kodjalinkUserToken');
  }

  async logout () {
    localStorage.removeItem('kodjalinkUsername');
    localStorage.removeItem('kodjalinkUserToken');
    
    return await apiUserLogout();
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
          domainName = {domainName}
          history = {createBrowserHistory()} />} >
          <Route
            exact path='/'
            element = {<Home
              user = {user} 
              domainName = {domainName}
              history = {createBrowserHistory()} />} />
          <Route
            path = '/list/:id'
            element = {<LinkList
              user = {user}
              domainName = {domainName}
              mode = 'view'
              history = {createBrowserHistory()} />} />
          <Route
            path = '/edit/:id'
            element = {<LinkList
              user = {user}
              domainName = {domainName}
              mode = 'edit'
              history = {createBrowserHistory()} />} />
          <Route
            exact path = '/list/new/'
            element = {<LinkList
              user = {user}
              domainName = {domainName}
              mode = 'new'
              history = {createBrowserHistory()} />} />
          <Route
            path = '/redirect/:url'
            element = {<Redirect
              user = {user}
              domainName = {domainName}
              history = {createBrowserHistory()} />} />
          <Route
            exact path = '/login/'
            element = {<Login
              user = {user}
              domainName = {domainName}
              history = {createBrowserHistory()} />} />
          <Route
            exact path = '/register/'
            element = {<CreateUser
              user = {user}
              domainName = {domainName}
              history = {createBrowserHistory()} />} /> 
          <Route
            exact path = '/myprofile/'
            element = {<UserPanel
              user = {user}
              domainName = {domainName}
              history = {createBrowserHistory()} />} />
          <Route
            exact path = '/myprofile/changepassword/'
            element = {<ChangePassword
              user={user}
              domainName = {domainName}
              history = {createBrowserHistory()} />} />
            <Route
              exact path='*'
              element = {<PageNotFound
                user = {user}
                domainName = {domainName}
                history = {createBrowserHistory()} />} />
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);