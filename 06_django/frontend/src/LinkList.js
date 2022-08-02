import React from 'react';
import Modal from './Modal';
import {
  apiSubmitNewList,
  apiSubmitEdittedList,
  apiLoadLinkList,
  apiGetAllLinks,
  apiPostNewLink,
} from './apiRequests';
import './Modal.css';
import './App.css'


class LinkList extends React.Component {
  constructor (props) {
    super(props);

    if (this.props.mode === 'view' ||
        this.props.mode === 'edit') {
      this.state = {
        linkListId: this.props.mode === 'view' ?
        window.location.pathname : '/' + window.location.pathname.split('/')[2] + '/', // fix this one
        isResponseOk: false,
        isLoaded: false,
        isModalDisplayed: false,
        newURL: '',
        editedURL: '',
        allLinks: [],
      }
    } else if (this.props.mode === 'new') {
      this.state = {
        isPrivate: false,
        links: [],
        title: '',
        linkListId: '',
      }
    }
    
    this.linkSaveEdit = this.linkSaveEdit.bind(this);
    this.onChangeEditedURL = this.onChangeEditedURL.bind(this);
    this.linkAdd = this.linkAdd.bind(this);
    this.linkListSave = this.linkListSave.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePrivacy = this.onChangePrivacy.bind(this);
    console.log(this.state)
  };

  componentDidMount () {
    if (this.props.mode !== 'new') {
      apiLoadLinkList(this);
    }
    apiGetAllLinks(this);
  }

  formatURLInput (input) {
    // Formats the URL to be properly handled by the DB
    let parsedURL = input.replace('www.', '');    
    if (!parsedURL.startsWith('http://') && !parsedURL.startsWith('https://')) {
      parsedURL = 'http://' + parsedURL;
    }
    if (parsedURL.endsWith('/')) { 
      parsedURL = parsedURL.slice(0, -1);
    }

    return parsedURL;
  }

  //////////////////////////////////////
  //  REACT ONCHANGE METHODS
  //////////////////////////////////////
  onChangeNewURL (event) {
    this.setState({
      newURL: event.target.value,
    })
  }

  onChangeEditedURL (event) {
    this.setState({
      editedURL: event.target.value,
    })
  }

  onChangeTitle (event) {
    this.setState({
      title: event.target.value,
    })
  }

  onChangePrivacy () {
    this.setState({
      isPrivate: !this.state.isPrivate,
    })
  }
  //////////////////////////////////////

  //////////////////////////////////////
  //  LINKLIST OPERATIONS:
  //    SAVE / DELETE
  //////////////////////////////////////
  linkListSave () {
    if (this.state.links.length === 0) {
      alert('Cannot submit an empty list!')
      return
    }

    if (this.props.mode === 'edit') {
      apiSubmitEdittedList(this)
    } else {
      apiSubmitNewList(this);
    }
  }
  //////////////////////////////////////

  //////////////////////////////////////
  //  LINK OPERATIONS:
  //    ADD / EDIT / DELETE / GET
  //////////////////////////////////////
  async linkAdd () {
    // input validation
    // **********
    let parsedURL = this.formatURLInput(this.state.newURL);
    if (this.state.links.find((l) => l.url === parsedURL)) {
      alert('This link is already in the list');
      return;
    }
    // **********

    // if link is not present in the db, add it
    if (!this.state.allLinks.find((l) => l.url === parsedURL)) {      
      apiPostNewLink(this, parsedURL);
    }
    
    await this.setState({
      links: [...this.state.links, {url: parsedURL, needsRendering: true}],
      newURL: '',
    });

    this.linkUpdateAll();
  }

  linkDelete (link) {
    this.setState({
      links: this.state.links.filter((l) => {
        return l !== link;
      }),
    })
  }

  async linkSaveEdit (n) {
    let newLinks = this.state.links.map((x) => x);
    newLinks[n] = {
      url: this.state.editedURL,
      title: this.state.editedURL,
      id: n,
      description: 'loading...',
      thumbnail: '',
      needsRendering: true
    };

    await this.setState({
      isModalDisplayed: false,
      links: newLinks,
      editedURL: '',
    });

    this.linkUpdateAll();
  }

  linkAskDelete (link) {
    if (window.confirm('Are you sure you want to delete this link?')) {
      this.linkDelete(link);
    }
  }

  linkUpdateAll () {
    let newLinks = this.state.links.map((link) => {
      if (link.needsRendering) {
        let linkDbEntry = this.linkUpdateInfo(link.url);
        if (linkDbEntry === undefined) {
          apiPostNewLink(this, link);
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

  linkUpdateInfo (url) {
    return this.state.allLinks.find((l) => {
      return (l.url === this.formatURLInput(url))
    })
  }
  //////////////////////////////////////

  //////////////////////////////////////
  //  RENDER PAGE ELEMENTS
  //////////////////////////////////////
  renderPrivacy () {
    if (this.props.mode === 'new' ||
        this.props.mode === 'edit') {
      return (
      <div className='PrivacyPanel'>
        <h3>Is this a private list: </h3>
        <input
          type = 'checkbox'
          checked = {this.state.isPrivate}
          onChange = {this.onChangePrivacy}
        />
      </div>
      )
    } else {
      return(
      <div className='PrivacyPanel'>
        <h3>{
          this.state.isPrivate ?
          <i>This list is private.</i> :
          ''
        }</h3>
      </div>
      )
    }
  }

  renderListTitlePanel () {
    return(
      this.props.mode === 'new' ? (
        <div className='ListTitleAndOwnerPanel'>
          <h3>List title: </h3>
          <input
            placeholder='Enter list title'
            onChange={this.onChangeTitle} />
        </div>
      ):
      (
        <div className='ListTitleAndOwnerPanel'>
          <h3>{this.state.title}</h3>
          <h5>(created by {this.state.owner})</h5>
          { this.props.mode === 'view' &&
            this.state.owner === localStorage.getItem('kodjalinkUsername') ?
            <button 
              onClick={() => {
                window.location.href = `/edit${this.state.linkListId}`
              }}
            >Edit list</button> :
            <></>
          }
        </div>
      )
    )
  }

  renderLinksPanel () {
    return (
      this.state.links.map((link, n) => { return (
        // link contents: title, description, thumbnail and url
        <div className='LinkContent' key={'linkContent' + link.id}>
          <div className='LinkTitle' key={'title' + link.id}> 
            <h4 key={`num${n}`}>{`${n+1}. `} {link.title}</h4>
          </div>
          <div className='LinkImageDescriptionPanel' key={'desc' + link.id}>
            <img
              src={link.thumbnail}
              alt={link.title + ' thumbnail'}
              height='100px'
              width='100px' />
            <h5>{link.description}</h5>
          </div>
          <div className='LinkHyperlinkPanel' key={'hlink' + link.id}>
            <h4><a key={`url${n}`} href={`${link.url}`}>{link.url}</a></h4>
          </div>
          {// edit and delete buttons
            this.props.mode === 'new' ||
            (this.props.mode === 'edit' &&
            localStorage.getItem('kodjalinkUsername') === this.state.owner)
            ? (
            <div className='LinkButtonsPanel' key={link.id}>
              <button key={`edit${n}`} onClick={() => this.renderEditLinkModal(n)}>Edit</button>
              <button key={`del${n}`} onClick={() => this.linkAskDelete(link)}>Delete</button>
            </div>
            ): <></>
          }
        </div>
      )})
    )
  }

  renderAddURLPanel () {
    return (this.props.mode !== 'view') ?
    (
      <div className='NewURL'>
        <h3>Add URL: </h3>
        <input placeholder='Enter URL' onChange={this.onChangeNewURL.bind(this)} />
        <button onClick={() => this.linkAdd()}>Add</button>
      </div>
    ):
    <></>
  }

  renderEditLinkModal (n) {
    this.setState({
      isModalDisplayed: true,
      editedURL: '',
      modalClassName: 'EditLinkModal',
      modalBody: (
        <input
          onChange = {this.onChangeEditedURL}
          placeholder = 'Enter URL'
        />
      ),
      modalHandleSave: () => this.linkSaveEdit(n),
    })
  }

  renderSaveListPanel () {
    return (
    (this.props.mode === 'new' ||
    (this.props.mode === 'edit' &&
      localStorage.getItem('kodjalinkUsername') === this.state.owner)) ? (
      <div>
        <button onClick={this.linkListSave}>Save LinkList</button>
      </div>
    ): <></>
    )
  }

  renderDeleteListPanel () {
    return (
    (this.props.mode === 'edit' &&
    localStorage.getItem('kodjalinkUsername') === this.state.owner) ? (
      <div>
        <button onClick={this.linkListDelete}>Delete LinkList</button>
      </div>
    ): <></>
    )
  }
  //////////////////////////////////////

  render() {  
    let content = <h5>loading...</h5>

    if (this.state.isLoaded || this.props.mode === 'new') {
      console.log(this.state)
      content = (
        <div className='ListContent'>
        {this.renderListTitlePanel()}
        {this.renderPrivacy()}
        {this.renderLinksPanel()}
        {this.renderAddURLPanel()}
        {this.renderSaveListPanel()}
        {this.renderDeleteListPanel()}
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
