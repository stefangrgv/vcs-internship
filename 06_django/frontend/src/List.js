import React from 'react';
import Modal from './Modal';
import './Modal.css';


class List extends React.Component {
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

  saveEditedLink () {
    console.log(this.state.editLink);
    this.deleteLink(this.state.editLink);
    this.addLink(this.state.editedURL);
    this.setState({
      isModalDisplayed: false,
      editedLink: null,
      editedURL: '',
    });
  }

  changeEditedURL (event) {
    this.setState({
      editedURL: event.target.value,
    })
  }

  editLink (link) {
    this.setState({
      isModalDisplayed: true,
      editedURL: '',
      editedLink: link,
      modalClassName: 'EditLinkModal',
      modalBody: (
        <input
          onChange = {this.changeEditedURL}
          placeholder = 'Enter URL'
        />
      ),
      modalHandleSave: this.saveEditedLink,
    })
    console.log('editlink', link)
  }

  inputURLChange (event) {
    this.setState({
      newURL: event.target.value,
    })
  }

  addLink (index=-1) {
    // input validation
    // **********
    let parsedURL;
    if (index === -1) {
      console.log('its -1, im creating new')
      parsedURL = this.state.newURL.replace('www.', '');
    } else {
      console.log(`its ${index}, im editing`)
      parsedURL = this.state.editedURL.replace('www.', '');
    }
    
    if (!parsedURL.startsWith('http://') && !parsedURL.startsWith('https://')) {
      parsedURL = 'http://' + parsedURL;
    }
    if (parsedURL.endsWith('/')) { 
      parsedURL = parsedURL.slice(0, -1);
    }
    // **********
    if (this.state.links.find((l) => l.url === parsedURL)) {
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
      links: [...this.state.links, {url: parsedURL, needsRendering: true}],
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

  updateLinks () {
    console.log('updating') //tova ne raboti kakto trqbva
    this.setState({
      links: this.state.links.map((link) => {
        console.log(link)
        // if (link.needsRendering) {
        //   console.log(link)
        //   return this.state.allLinks.find(
        //     (l) => l.url === link.url
        //   )
        // }
        return link;
      }),
    })
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
            <div className='LinkInformation' key={link.id}>
              <h4>{`${n+1}. `}<a href={`${link.url}`}>{link.url}</a></h4>
              <h5>{`${link.description}`}</h5>
              {
                localStorage.getItem('kodjalinkUsername') === this.state.owner ? 
                (
                  <div className='LinkButtons' key={link.id}>
                    <button onClick={() => this.editLink(link)}>Edit</button>
                    <button onClick={() => this.askDeleteLink(link)}>Delete</button>
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

export default List;
