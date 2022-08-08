import React from 'react';
import withRouter from './withRouter';
import './style.css';


class Redirect extends React.Component {
  componentDidMount () {
    setTimeout(() => {
      window.location.replace(this.props.params.url);
    }, 500);
  }

  render () {
    return (
      <div>
        <h3>Redirecting...</h3>
      </div>
    )
  }
}

export default withRouter(Redirect);