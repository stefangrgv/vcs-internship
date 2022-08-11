import React from 'react';
import pnf from './img/pagenotfound.jpg'
import './style.css';


class PageNotFound extends React.Component {
  render () {
    return (
      <div>
        <img
          className = 'img-page-not-found'
          alt = 'Page not found!'
          src = {pnf}/>
      </div>
    )
  }
}

export default PageNotFound;