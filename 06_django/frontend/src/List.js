import React from 'react';
import './App.css';


class List extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isResponseOk: true,
      isLoaded: false,
    };
  }

  componentDidMount () {
    this.loadList(window.location.pathname);
  }

  loadList (id) {
    fetch(`http://localhost:8000/api/lists${id}`, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      // if response is not ok
      this.setState({
        isResponseOk: false,
      });
      if (response.status === 401) {
        throw new Error('I don\'t know you. Please login.')
      }
      if (response.status === 403) {
        throw new Error('Permission denied.')
      }
      if (response.status === 404) {
        throw new Error('Kodjalink not found!')
      }
    })
    .then(data => {
      if (data !== null) {
        this.setState({
          id: data.id,
          title: data.title,
          links: data.links,
          owner: data.owner,
          private: data.private,
          isLoaded: true,
        })
      }
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        isResponseOk: false,
        errorMessage: error.message,
      });
    });
  }

  render() {
    let content = <h5>loading...</h5>
    
    if (this.state.isLoaded) {
      content = (
        <div className='ListContent'>
        <h4>Links:</h4>
        {this.state.links.map((link, n) => {
          return (
            <div key={link.id}>
              <h4>{`${n+1}. `}<a href={`${link.url}`}>{link.url}</a></h4>
              <h5>{`${link.description}`}</h5>
            </div>
          )
        })}
        </div>
      );
    } else if (!this.state.isResponseOk) {
      content = this.state.errorMessage;
    }

    return (
      <div className='List'>
        {content}
      </div>
    )
  }
}

export default List;
