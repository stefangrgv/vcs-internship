import './App.css';
import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kodjalink: document.getElementsByClassName('api_call')[0].id,
      isLoaded: false,
    }
  }

  linksToArray (links) {
    return links.split(',')
  }

  getData () {
    axios.get(`/api/${this.state.kodjalink}/`)
    .then((response) => {
      this.setState(
        {isLoaded: true, links: this.linksToArray(response.data.links)}
      )
    })
    .catch((error) => {
      console.log(error);
    });
  }

  remove (n) {
    console.log(n)
    alert(`pls implement me ${n}`)
  }

  renderLinks () {
    const listItems = this.state.links.map((link, n) => <li>{link}<button onClick={() => this.remove(n)}>Remove</button></li>)
    return (
      <div className='kodjalinkContents'>
        <ul>{listItems}</ul>
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
        {this.state.isLoaded ? <form><input name="urlInput" type="url" placeholder="https://va6iqtlink.kom"/><input name="urlSubmit" type="submit" value="Dobavi" /></form> : <></>}
      </div>
    );
  }
}

export default App;
