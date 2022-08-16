import React from 'react';
import  { Navigate, useParams } from 'react-router-dom';
import './style.css';


function Redirect (props) {
  // componentDidMount () {
  //   setTimeout(() => {
  //     window.location.replace(this.props.params.url); // use router
  //   }, 500);
  // }

  const params = useParams();
  return (
      <>
      <h3>Redirecting...</h3>
      <Navigate to={params.url} replace={true}/> 
      {/* how to do that with navigate? */}
      </>
  )
}

export default Redirect;