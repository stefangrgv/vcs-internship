import React from 'react';

import pnf from './img/pagenotfound.jpg'
import './style.css';


function PageNotFound (props) {
  return (<img className='img-page-not-found' alt='Page not found!' src={pnf}/>)
}

export default PageNotFound;
