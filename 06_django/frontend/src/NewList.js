import React from 'react';
import './App.css';


class NewList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      newURL: '',
      links: [],
    }
  }

  inputURLChange (event) {
    this.setState({
      newURL: event.target.value,
    })
  }

  addLink () {
    alert('pls implement input validation');
    this.setState({
      links: [...this.state.links, this.state.newURL],
    });
  }

  checkIfLinkExists (url) {
    alert('this fetch() breaks when using the url as a lookup_field')
    fetch(`http://localhost:8000/api/links/${url}`, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
      })
    })
    .then((response) => {
      if (response.ok) {
        return (response.json());
      }
      throw new Error('Error in fetching link data from server!');
    })
    .then((data) => {
      console.log('link fetched ')
      console.log(data)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  renderLinks () {
    // now include async writing and reading from db
    return (
      <div className='links'>
        {this.state.links.map((link, ind) => {
          this.checkIfLinkExists(link)
          return(
            <h3 key={ind}>{ind+1}. <a href={`${link}`}>{link}</a></h3>
          )
        })}
      </div>
    )
  }

  render () {
      return (
      <div className='NewList'>
          <span>
              <input placeholder='Enter URL' onChange={this.inputURLChange.bind(this)}/>
              <button onClick={this.addLink.bind(this)}>Add</button>
          </span>
          {this.renderLinks()}
      </div>
      )
  }
}

export default NewList;
