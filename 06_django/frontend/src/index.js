import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App';
import LinkList from './LinkList';
import Login from './Login';
import CreateUser from './CreateUser';
import UserPanel from './UserPanel';
import ChangePassword from './ChangePassword'
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route path=':id' element = {<LinkList mode = 'view' />} />
          <Route path='/edit/:id' element = {<LinkList mode = 'edit' />} />
          <Route exact path='new' element = {<LinkList mode='new' />} />
        </Route>
        <Route path='/login/' element={<Login />} />
        <Route path='/register/' element={<CreateUser />} /> 
        <Route path='/myprofile/' element={<UserPanel />} />
        <Route path='/myprofile/changepassword/' element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);