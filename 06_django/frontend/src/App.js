import React from 'react';
import './App.css';
// import axios from 'axios';

let TOKEN = '6e42ba92f66fe3bf7a36df9405433a1487ca4627'

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount () {
    this.loadList();
  }

  loadLinks () {
    let links = [];
    this.state.linksIdArray.map((link, id) => {
      fetch(`http://localhost:8000/api/links/${link}/`, {
        method: 'get',
        headers: new Headers({
          'Authorization': 'Token ' + TOKEN,
        })
      })
      .then(response => {
        console.log(response);
        if (response.ok) {
          console.log(response)
          return response.json();
        }
        alert('Error in fetching link!');
      })
      .then(data => {
        if (data != null) {
          console.log(data)
          links.push(data);
          if (id === this.state.linksIdArray.length - 1) {
            this.setState({
              links: links,
              isLoaded: true,
            });
          }
        }
      })
    });
  }

  loadList () {
    console.log('loading')
    fetch('http://localhost:8000/api/lists/1/', {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Token ' + TOKEN,
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      alert('Error in fetching list!');
    })
    .then(data => {
      if (data !== null) {
        this.setState({
          id: data.id,
          title: data.title,
          linksIdArray: data.links,
          links: [],
          owner: data.owner,
          private: data.private,
        })
        this.loadLinks();
      }
    });
  }

  render() {
    let content = <h5>loading...</h5>

    if (this.state.isLoaded) {
      content = (
        <div>
        <h4>Links:</h4>
        {this.state.links.map((link) => {
          <div>
            <h4>{`${link.id}. <a href="${link.url}">${link.url}</a>`}</h4>
            <h5>{`${link.description}`}</h5>
          </div>
        })}
        </div>
      );
    }

    return (
      <div className='App'>
        {content}
      </div>
    )
  }
}

export default App;
