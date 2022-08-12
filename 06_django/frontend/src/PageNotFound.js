import React from 'react';
import pnf from './img/pagenotfound.jpg'
import './style.css';


class PageNotFound extends React.Component {
  render () {
    return (
      <img
        className = 'img-page-not-found'
        alt = 'Page not found!'
        src = {pnf}/>
    )
  }
}

export default PageNotFound;