import React from 'react';
import  { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './style.css';


function Redirect (props) {
  const params = useParams();
  useEffect ( () => {
    setTimeout(() => {
      window.location.replace(params.url);
    }, 1000);
  });
  
  return (
    <h3>Redirecting to <i>{params.url}</i></h3>
  )
}

export default Redirect;
