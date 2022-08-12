import React from 'react';
import './style.css';

class Home extends React.Component {
  render () {
    return (
      <>
        <h2 className='home site-title'>KodjaLink</h2>
        <h5 className='home site-description'>The best website for sharing lists of links.</h5>
      </>
    )
  }
}

export default Home;