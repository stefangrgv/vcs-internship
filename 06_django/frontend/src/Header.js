import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


class Header extends React.Component {
  constructor (props) {
    super(props);
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
    return (
      <div className='navbar navbar-middle'></div>
    )
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
        <h4 className='navbar-text'>Logged in as <Link
          className='navbar-hyperlink'
          to='/myprofile/'
        >{this.props.user.username}</Link></h4>
        <button
          className='btn btn-logout'
          onClick={this.props.user.logout}
        >Logout</button>
      </div>
      )
  }

  render () {
    return (
      <nav className='navbar'>
        <h4 className='navbar-text'>
          <Link
            className='navbar-hyperlink'
            to='/'>
            KodjaLink&copy;
          </Link></h4>
        {this.renderNewButton()}
        {this.renderGreeting()}
      </nav>
    )
  }
}

export default Header;