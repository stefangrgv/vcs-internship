import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
// import App from './App';
// import List from './List';
// import NewList from './NewList';
import LinkList from './LinkList';
import Login from './Login';
import CreateUser from './CreateUser';
import UserPanel from './UserPanel';
import ChangePassword from './ChangePassword'
import './index.css';

//let TOKEN = '6e42ba92f66fe3bf7a36df9405433a1487ca4627';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<LinkList />} />
        <Route path=':id' element = {<LinkList mode = 'view' />} />
        <Route path='edit/:id/' element = {<LinkList mode = 'edit' />} />
        <Route exact path='new' element = {<LinkList mode='new' jas='wasd' />} />
        {/* <Route path='/' element={<App />} >
          <Route path=':id' element = {<List token={TOKEN} />} />
          <Route exact path='new' element = {<NewList />} />
        </Route> */}
        <Route path='/login/' element={<Login />} />
        <Route path='/register/' element={<CreateUser />} /> 
        <Route path='/myprofile/' element={<UserPanel />} />
        <Route path='/myprofile/changepassword/' element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);