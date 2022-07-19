import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kodjalink: document.getElementsByClassName('api_call')[0].id,
      isLoaded: false,
      data: {},
    }
  }

  getData () {
    axios.get(`/api/${this.state.kodjalink}/`)
    .then((response) => {
      this.setState(
        {isLoaded: true, data: response.data}
      )
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  renderLinks () {
    return (
      <div className='kodjalinkContents'>
        <h5>kodjalink {this.state.data.id}</h5>
        <h5>links:</h5>
        <ul>
          
        </ul>
      </div>
    )
  }

  render () {
    if (!this.state.isLoaded) {
      this.getData();
    }

    console.log(this.state);

    return (
      <div className="App">
        <h3>{this.state.isLoaded ? this.renderLinks() : 'loading...'}</h3>
      </div>
    );
  }
}

export default App;
