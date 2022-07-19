import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      data: {},
    }
  }

  getData () {
    axios.get('/api/')
    .then((response) => {
      this.setState(
        {isLoaded: true, data: response.data[0]}
      )
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render () {
    this.getData();

    return (
      <div className="App">
        <h3>{this.state.isLoaded ? this.state.data['url'] : 'loading...'}</h3>
      </div>
    );
  }
}

export default App;
