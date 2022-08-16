import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


function Header (props) {
  const renderTitle = () => {
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

  const renderNewButton = () => {
    if (props.user.username !== null) {
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

  const renderGreeting = () => {
    if (props.user.username === null) {
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
        <h4 className='navbar-text'>Logged in as {props.user.username}</h4>
        <button
          className='btn'
          onClick={() => window.location.href = '/myprofile/'} // use Router
        >Profile</button>
        <button
          className='btn'
          onClick={logout}
        >Logout</button>
      </div>
      )
  }

  const logout = async () => {
    let response = await props.user.logout();
    if (response.status === 200) {
      window.location.href = '/';
    } else {
      // MAKEMODAL
      props.modalChange.setModalShow(true);
      // props.modalChange.setModalYesOnclick( () => {
      //   props.modalChange.setModalShow(false);
      // });
      props.modalChange.setModalYesText('OK');
      props.modalChange.setModalNoText('');
      props.modalChange.setModalBody(response.error.message);
    }
  }

  return (
    <nav className={props.user.username === null ? 'navbar-guest' : 'navbar'}>
      {renderTitle()}
      {renderNewButton()}
      {renderGreeting()}
    </nav>
  )
}

export default Header;