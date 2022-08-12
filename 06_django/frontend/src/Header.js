import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


class Header extends React.Component {
  renderTitle () {
    return (
    <div className='navbar-text'>
      <h4><Link
        className='navbar-hyperlink'
        to='/'>
        KodjaLink&copy;
      </Link></h4>
    </div>
    )
  }

  renderNewButton () {
    if (this.props.user.username !== null) {
      return (
      <div className='navbar navbar-middle'>
        <h4 className='navbar-text'><Link
          reloadDocument
          className='navbar-hyperlink'
          to='/list/new'
        >New linklist</Link></h4>
      </div>
      )
    }
  }

  renderGreeting () {
    if (this.props.user.username === null) {
      return (
      <div className='navbar navbar-username'>
        <h4 className='navbar-text'>Hello, guest! Please <Link
          className='navbar-hyperlink'
          to='/register/'
          >register</Link> or <Link
            className='navbar-hyperlink'
            to='/login'
        >login</Link>.</h4>
      </div>
      )
    }
    return (
      <div className='navbar navbar-username'>
        <h4 className='navbar-text'>Logged in as {this.props.user.username}</h4>
        <button
          className='btn'
          onClick={() => window.location.href = '/myprofile/'} // use Router
        >Profile</button>
        <button
          className='btn'
          onClick={this.props.user.logout}
        >Logout</button>
      </div>
      )
  }

  render () {
    let navbarType;
    {console.trace('navbar rendered')}
    (this.props.user.username === null) ? navbarType = 'navbar-guest' : navbarType = 'navbar';
    return (
      <nav className={navbarType}>
        {this.renderTitle()}
        {this.renderNewButton()}
        {this.renderGreeting()}
      </nav>
    )
  }
}

export default Header;