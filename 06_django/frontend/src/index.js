import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
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
import PageNotFound from './PageNotFound';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element = {<App/>} >
          <Route
            exact path='/'
            element = {<Home/>} />
          <Route
            path = '/list/:id'
            element = {<LinkList mode = 'view'/>} />
          <Route
            path = '/edit/:id'
            element = {
              <LinkList mode = 'edit'/>
            } />
          <Route
            exact path = '/list/new/'
            element = {<LinkList mode = 'new' />} />
          <Route
            path = '/redirect/:url'
            element = {<Redirect/>} />
          <Route
            exact path = '/login/'
            element = {<Login/>} />
          <Route
            exact path = '/register/'
            element = {<CreateUser/>} /> 
          <Route
            exact path = '/myprofile/'
            element = {<UserPanel/>} />
          <Route
            exact path = '/myprofile/changepassword/'
            element = {<ChangePassword/>} />
            <Route
              exact path='*'
              element = {<PageNotFound/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
