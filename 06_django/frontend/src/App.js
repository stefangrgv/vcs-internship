import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import withRouter from './withRouter';
import './style.css';

class App extends React.Component {
  render() {
    return (
    <div className='app'>
      <Header user = {this.props.user} />
      <Outlet user = {this.props.user} />
    </div>
    )
  }
}

export default withRouter(App);
