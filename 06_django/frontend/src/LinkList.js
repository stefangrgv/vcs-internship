import React from 'react';
import Modal from './Modal';
import './Modal.css';
import './App.css'

class LinkList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isResponseOk: false,
      isLoaded: false,
      isModalDisplayed: false,
      newURL: '',
      editedURL: '',
      allLinks: [],
    };

    this.saveEditedLink = this.saveEditedLink.bind(this);
    this.changeEditedURL = this.changeEditedURL.bind(this);
    this.addLink = this.addLink.bind(this);
    this.saveLinkList = this.saveLinkList.bind(this)
  }

  componentDidMount () {
    this.loadList(window.location.pathname);
    this.getAllLinks();
  }

  loadList (id) {
    fetch(`http://localhost:8000/api/lists${id}`, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
      })
    })
    .then((response) => {
      if (response.ok) {
        this.setState({
          isResponseOk: true,
        });
        return response.json();
      }
      // if response is not ok
      this.setState({
        isResponseOk: false,
      });
      if (response.status === 401) {
        throw new Error('You are not logged in.')
      }
      if (response.status === 403) {
        throw new Error('Permission denied: this list is private.')
      }
      if (response.status === 404) {
        throw new Error('List not found!')
      }
    })
    .then((data) => {
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
        errorMessage: error.message,
      });
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

  async saveEditedLink (n) {
    let newLinks = this.state.links.map((x) => x);
    newLinks[n] = {
      url: this.state.editedURL,
      title: this.state.editedURL,
      id: n,
      description: 'loading...',
      thumbnail: '',
      needsRendering: true
    };
    console.log('saveEditedLink ', newLinks)

    await this.setState({
      isModalDisplayed: false,
      links: newLinks,
      editedURL: '',
    });
    console.log('state', this.state.links)

    this.updateLinks();
  }

  changeEditedURL (event) {
    this.setState({
      editedURL: event.target.value,
    })
  }

  editLink (n) {
    this.setState({
      isModalDisplayed: true,
      editedURL: '',
      modalClassName: 'EditLinkModal',
      modalBody: (
        <input
          onChange = {this.changeEditedURL}
          placeholder = 'Enter URL'
        />
      ),
      modalHandleSave: () => this.saveEditedLink(n),
    })
  }

  formatURL (urlLink) {
    let parsedURL = urlLink.replace('www.', '');    
    if (!parsedURL.startsWith('http://') && !parsedURL.startsWith('https://')) {
      parsedURL = 'http://' + parsedURL;
    }
    if (parsedURL.endsWith('/')) { 
      parsedURL = parsedURL.slice(0, -1);
    }

    return parsedURL;
  }

  inputURLChange (event) {
    this.setState({
      newURL: event.target.value,
    })
  }

  async addLink () {
    // input validation
    // **********
    let parsedURL = this.formatURL(this.state.newURL);
    // **********
    if (this.state.links.find((l) => l.url === parsedURL)) {
      alert('This link is already in the list');
      return;
    }

    // if link is not present in the db, add it
    if (!this.state.allLinks.find((l) => l.url === parsedURL)) {      
      this.pushLinkToDb(parsedURL);
    }
    
    await this.setState({
      links: [...this.state.links, {url: parsedURL, needsRendering: true}],
      newURL: '',
    });

    this.updateLinks();
  }

  deleteLink (link) {
    this.setState({
      links: this.state.links.filter((l) => {
        return l !== link;
      }),
    })
  }

  askDeleteLink (link) {
    if (window.confirm('Are you sure you want to delete this link?')) {
      this.deleteLink(link);
    }
  }

  fetchLinkFromDb (url) {
    return this.state.allLinks.find((l) => {
      return (l.url === this.formatURL(url))
    })
  }

  pushLinkToDb (url) {
    fetch('http://localhost:8000/api/links/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
      }),
      body: JSON.stringify({
        'url': url,
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

  updateLinks () {
    let newLinks = this.state.links.map((link) => {
      if (link.needsRendering) {
        let linkDbEntry = this.fetchLinkFromDb(link.url);
        console.log('just before if #235, var is ', linkDbEntry)
        if (linkDbEntry === undefined) {
          this.pushLinkToDb(link);
          return link;
        } else {
          return linkDbEntry;
        }
      }
      return link;
    })
    
    this.setState({
      links: newLinks,
    });
  }

  saveLinkList () {
    fetch(`http://localhost:8000/api/lists${window.location.pathname}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
      },
      body: JSON.stringify({
        title: this.state.title,
        links: this.state.links,
        private: this.state.private,
      })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Server request failed!');
      }
    })
    .then((data) => {
      alert('Saved!')
      window.location.href = `/${data.id}/`
    })
    .catch((error) => {
      alert(error);
    });
  }

  render() {  
    let content = <h5>loading...</h5>

    if (this.state.isLoaded) {
      content = (
        <div className='ListContent'>
        <h3>{this.state.title}</h3>
        <h5>(created by {this.state.owner})</h5>
        {this.state.links.map((link, n) => {
          return (
            <div className='LinkInformation' key={'info' + link.id}>
              <div className='LinkTitle' key={'title' + link.id}> 
                <h4 key={`num${n}`}>{`${n+1}. `} {link.title}</h4>
              </div>
              <div className='LinkImageDescription' key={'desc' + link.id}>
                <img src={link.thumbnail} height='100px' width='100px' />
                <h5>{link.description}</h5>
              </div>
              <div className='LinkHyperlink' key={'hlink' + link.id}>
                <h4><a key={`url${n}`} href={`${link.url}`}>{link.url}</a></h4>
              </div>
              {
                localStorage.getItem('kodjalinkUsername') === this.state.owner ? 
                (
                  <div className='LinkButtons' key={link.id}>
                    <button key={`edit${n}`} onClick={() => this.editLink(n)}>Edit</button>
                    <button key={`del${n}`} onClick={() => this.askDeleteLink(link)}>Delete</button>
                  </div>
                ):
                <></>
              }
            </div>
          )
        })}
         <div className='NewURL'>
            <h3>Add URL: </h3>
            <input placeholder='Enter URL' onChange={this.inputURLChange.bind(this)} />
            <button onClick={() => this.addLink()}>Add</button>
          </div>
          <div className='SaveList'>
            <button onClick={this.saveLinkList}>Save LinkList</button>
          </div>
        <Modal
          show = {this.state.isModalDisplayed}
          handleSave = {this.state.modalHandleSave}
          body = {this.state.modalBody}
        />
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

export default LinkList;
