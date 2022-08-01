import React from 'react';
import './App.css';
import { apiSubmitNewList } from './apiRequests';


class NewList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      isPrivateChecked: false,
      newURL: '',
      links: [],
      allLinks: [],
    }
  }

  componentDidMount () {
    this.getAllLinks();
  }

  inputTitleChange (event) {
    this.setState({
      title: event.target.value,
    })
  }

  changePrivacy () {
    this.setState({
      isPrivateChecked: !this.state.isPrivateChecked,
    })
  }

  inputURLChange (event) {
    this.setState({
      newURL: event.target.value,
    })
  }

  addLink () {
    // input validation
    // **********
    let parsedURL = this.state.newURL.replace('www.', '');
    if (!parsedURL.startsWith('http://') && !parsedURL.startsWith('https://')) {
      parsedURL = 'http://' + parsedURL;
    }
    if (parsedURL.endsWith('/')) { 
      parsedURL = parsedURL.slice(0, -1);
    }
    // **********
    if (this.state.links.find((l) => l === parsedURL)) {
      alert('This link is already in the list');
      return;
    }

    if (!this.state.allLinks.find((l) => l.url === parsedURL)) {
      fetch('http://localhost:8000/api/links/', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
        }),
        body: JSON.stringify({
          'url': parsedURL,
        })
      })
      .then((response) => {
        if (response.ok) {
          this.getAllLinks();
          return (response.json());
        }
        if (response.status === 400) {
          throw new Error('Link is not properly formatted')
        }
        throw new Error('Error in posting link data to server!');
      })
      .catch((error) => alert('Error:' + error))
    }
    this.setState({
      links: [...this.state.links, parsedURL],
    });
  }

  getAllLinks () {
    fetch('http://localhost:8000/api/links/', {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
      }),
    })
    .then((response) => {
      if (response.ok) {
        return (response.json());
      }
      throw new Error('Error in fetching link data from server!');
    })
    .then((data) => {
      console.log('all links fetched ')
      this.setState({
        allLinks: data,
      });
    })
    .catch((error) => {
      console.error(error)
    })
  }

  renderLinks () {
    // now include async writing and reading from db
    return (
      <div className='Links'>
        {this.state.links.map((link, ind) => {
          return(
            <h3 key={ind}>{ind+1}. <a href={`${link}`}>{link}</a></h3>
          )
        })}
      </div>
    )
  }

  getLinkIdInDb (link) {
    let id;
    // am i using this method correctly? no, i'm not
    this.state.allLinks.find((l, i) => {
      if (l.url === link) {
        return i;
        //id = i;
      }
    })
    return id;
  }

  submitNewList () {
    if (this.state.links.length === 0) {
      alert('List is empty!');
      return;
    }

    if (this.state.title.length === 0) {
      alert('Please enter a title');
      return;
    }

    let linksObjects = [];
    this.state.links.forEach((link) => {
      linksObjects.push(this.state.allLinks[this.getLinkIdInDb(link)]);
    })
    console.log(linksObjects)
    
    this.setState({
      isSaved: false
    });

    apiSubmitNewList(this.state.title, linksObjects, this.state.isPrivateChecked);
  }

  render () {
      return (
      <div className='NewList'>
          <div className='Title'>
          <h3>List title: </h3>
            <input placeholder='Enter list title' onChange={this.inputTitleChange.bind(this)} />
          </div>
          <div className='PrivateToggle'>
            <h3>Make this a private list: </h3>
            <input
              type = 'checkbox'
              checked = {this.state.isPrivateChecked}
              onChange = {this.changePrivacy.bind(this)}
            />
          </div>
          <div className='NewURL'>
            <h3>Add URL: </h3>
            <input placeholder='Enter URL' onChange={this.inputURLChange.bind(this)} />
            <button onClick={this.addLink.bind(this)}>Add</button>
          </div>
          {this.renderLinks()}
          <button onClick={this.submitNewList.bind(this)}>Create list</button>          
      </div>
      )
  }
}

export default NewList;
