import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './Header';
import Footer from './Footer';
import ListContents from './ListContents'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App />
    <ListContents />
    <Footer />
  </React.StrictMode>
);