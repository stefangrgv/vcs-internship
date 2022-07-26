import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App';
import List from './List';
import Login from './Login';
import './index.css';

let TOKEN = '6e42ba92f66fe3bf7a36df9405433a1487ca4627';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route path=':id' element = {<List token={TOKEN} />} />
        </Route>
        <Route path='/login/' element={<Login />} ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);