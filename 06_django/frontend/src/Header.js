import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './style.css';


function Header (props) {
  const context = props.context;
  const navigate = useNavigate();

  const navigateToUserpanel = () => {
    navigate('/myprofile/');
  };

  const renderTitle = () => {
    return (<div className='navbar-text'>
      <h4><Link className='navbar-hyperlink' to='/'>KodjaLink&copy;</Link></h4>
    </div>);
  };

  const renderNewButton = () => {
    if (context.user.username !== null) {
      return (<div className='navbar navbar-middle'>
        <h4 className='navbar-text'><Link reloadDocument className='navbar-hyperlink' to='/list/new'>New linklist</Link></h4>
      </div>);
    }
  };

  const renderGreeting = () => {
    if (context.user.username === null) {
      return (<div className='navbar navbar-username'>
        <h4 className='navbar-text'>Hello, guest! Please <Link className='navbar-hyperlink' to='/register/'>register</Link>
        /<Link className='navbar-hyperlink' to='/login'>login</Link>.</h4>
      </div>);
    }
    return (<div className='navbar navbar-username'>
      <h4 className='navbar-text'>Logged in as {context.user.username}</h4>
      <button className='btn' onClick={navigateToUserpanel}>Profile</button>
      <button className='btn' onClick={logout}>Logout</button>
    </div>);
  };

  const logout = () => {
    context.user.logout().then((response) => {
      if (response.status === 200) {
        navigate('/');
      } else {
        context.showMessageModal(response.error.message);
      }
    });
  };

  return (<nav className={context.user.username === null ? 'navbar-guest' : 'navbar'}>
    {renderTitle()}
    {renderNewButton()}
    {renderGreeting()}
  </nav>);
}

export default Header;