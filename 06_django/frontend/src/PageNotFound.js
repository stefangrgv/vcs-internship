import React from 'react';
import './style.css';


class PageNotFound extends React.Component {
  render () {
    return (
      <div>
        <img
          className = 'img-page-not-found'
          alt = 'Page not found!'
          src = 'pagenotfound.jpg'/>
      </div>
    )
  }
}

export default PageNotFound;