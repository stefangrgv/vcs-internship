import React from 'react';
import { Modal, closeModal } from './Modal';
import withRouter from './withRouter';
import { Link } from 'react-router-dom';
import {
  apiSubmitNewList,
  apiSubmitEditedList,
  apiLoadLinkList,
  apiGetAllLinks,
  apiPostNewLink,
  apiListDelete,
} from './apiRequests';
import './style.css';


class LinkList extends React.Component {
  constructor (props) {
    super(props);
    
    if (this.props.mode === 'view' ||
        this.props.mode === 'edit') {
      this.state = {
        notNew: true,
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
        newURL: '',
      }
    }
    
    this.modalSave = this.modalSave.bind(this);
    this.onChangeEditedURL = this.onChangeEditedURL.bind(this);
    this.linkAdd = this.linkAdd.bind(this);
    this.linkListSave = this.linkListSave.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePrivacy = this.onChangePrivacy.bind(this);
    this.onChangeNewURL = this.onChangeNewURL.bind(this);
  };

  componentDidMount () {
    if (this.props.mode !== 'new') {
      apiLoadLinkList(this);
    }
    apiGetAllLinks(this);
  }

  componentDidUpdate () {
    if ((this.state.isLoaded || this.props.mode === 'new') &&
        this.state.links.find((l) => l.needsRendering &&
        !this.state.isFetchingLinks)) {
      let newLinks = this.state.links.map((link) => {
        if (link.needsRendering) {
          let linkDbEntry = this.linkUpdateInfo(link.url);
          if (linkDbEntry === undefined) {
            this.setState({
              isFetchingLinks: true,
            })
            apiGetAllLinks(this);
            return link;
          }
          return linkDbEntry;
        } else {
          return link;
        }
      });

      this.setState({
        links: newLinks,
      });
    }
  }

  formatURLInput (input) {
    // Formats the URL to be properly handled by the DB
    let parsedURL = input.replace('www.', '');
    while (parsedURL.startsWith('/')) {
      parsedURL = parsedURL.slice(1);
    }

    if (!parsedURL.startsWith('http://') && !parsedURL.startsWith('https://')) {
      parsedURL = 'http://' + parsedURL;
    }

    if (parsedURL.endsWith('/')) { 
      parsedURL = parsedURL.slice(0, -1);
    }

    return parsedURL;
  }

  formatThumbnails () {
    /* 
    Formats the URL paths of all the thumbnails in the list.
    In some cases they are not accepted by the backend unless reformatted.
    */
    this.setState({
      links: this.state.links.map((link) => {
        let l = link;
        l['thumbnail'] = this.formatURLInput(link['thumbnail']);
        return l;
      }),
    });
  }

  trimLinkTitle () {
    /*
    Trims the title of the links to ensure it fits the
    limit enforced in the database (100 symbols).
    */
    this.setState({
      links: this.state.links.map((link) => {
        if (link['title'].length < 100) {
          return link;
        }

        let l = link;
        l['title'] = l['title'].slice(0, 97) + '...';
        return l;
      }),
    });
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
    if (this.state.title.replaceAll(' ', '') === '') {
      this.setState({
        isModalDisplayed: true,
        modalYesMethod: () => closeModal(this),
        modalYesText: 'OK',
        modalBody: 'Please enter a title!',
        modalNoText: '',
      });
      return null
    }

    this.formatThumbnails();
    this.trimLinkTitle();

    if (this.props.mode === 'edit') {
      apiSubmitEditedList(this)
    } else {
      apiSubmitNewList(this);
    }
  }

  linkListAskDelete (link) {
    this.setState({
      isModalDisplayed: true,
      modalYesMethod: () => {
        apiListDelete(this, this.props.params.id, '/myprofile/');
        closeModal(this);
      },
      modalYesText: 'Yes',
      modalBody: 'Are you sure you want to delete this linklist?',
      modalNoText: 'No',
      modalNoMethod: () => closeModal(this),
    });
  }
  //////////////////////////////////////

  //////////////////////////////////////
  //  LINK OPERATIONS:
  //    ADD / EDIT / DELETE / GET
  //////////////////////////////////////
  linkValidate (url) {
    if (url.replaceAll(' ', '') === '') {
      this.setState({
        isModalDisplayed: true,
        modalYesMethod: () => closeModal(this),
        modalYesText: 'OK',
        modalBody: 'Please enter a non-empty URL.',
        modalNoText: '',
      });
      return false;
    }

    if (this.state.links.find((l) => l.url === this.formatURLInput(url))) {
      this.setState({
        isModalDisplayed: true,
        modalYesMethod: () => closeModal(this),
        modalYesText: 'OK',
        modalBody: 'This link is already in the list.',
        modalNoText: '',
      });
      return false;
    }

    return true;
  }

  linkAdd () {
    if (this.linkValidate(this.state.newURL)) {
      let parsedURL = this.formatURLInput(this.state.newURL)

      this.setState({
        links: [...this.state.links, {url: parsedURL, needsRendering: true}],
        newURL: '',
      });

      // if link is not present in the db, add it
      if (!this.state.allLinks.find((l) => l.url === parsedURL)) {
        apiPostNewLink(this, parsedURL);
      }
    }
  }

  linkDelete (link) {
    this.setState({
      links: this.state.links.filter((l) => {
        return l !== link;
      }),
    })
  }

  linkAskDelete (link) {
    this.setState({
      isModalDisplayed: true,
      modalYesMethod: () => {
        this.linkDelete(link);
        closeModal(this);
      },
      modalYesText: 'Yes',
      modalBody: 'Are you sure you want to delete this link?',
      modalNoText: 'No',
      modalNoMethod: () => closeModal(this),
    });
  }

  linkUpdateInfo (url) {
    return this.state.allLinks.find((l) => {
      return (l.url === this.formatURLInput(url))
    })
  }
  //////////////////////////////////////

  //////////////////////////////////////
  //  EDIT MODAL ONCLICK METHODS
  //////////////////////////////////////
  modalSave (n) {
    if (this.linkValidate(this.state.editedURL)) {
      let parsedURL = this.formatURLInput(this.state.editedURL);
      if (!this.state.allLinks.find((l) => l.url === parsedURL)) {
        apiPostNewLink(this, parsedURL);
        apiGetAllLinks(this);
      }

      let newLinks = this.state.links.map((x) => x);
      newLinks[n] = {
        url: this.state.editedURL,
        title: this.state.editedURL,
        id: n,
        description: 'loading...',
        thumbnail: '',
        needsRendering: true
      };

      this.setState({
        isModalDisplayed: false,
        links: newLinks,
        editedURL: '',
      });

      this.modalInput.value = '';
    }
  }

  modalCancel () {
    this.setState({
      isModalDisplayed: false,
      editedURL: '',
    })
    this.modalInput.value = '';
  }
  //////////////////////////////////////

  //////////////////////////////////////
  //  RENDER PAGE ELEMENTS
  //////////////////////////////////////
  renderPrivacy () {
    if (this.props.mode === 'new' ||
        this.props.mode === 'edit') {
      return (
      <div className='panel privacy-panel'>
        <h3>Is this a private list: </h3>
        <input
          type = 'checkbox'
          checked = {this.state.isPrivate}
          onChange = {this.onChangePrivacy}
        />
      </div>
      )
    }
  }

  renderListTitlePanel () {
    return(
      this.props.mode !== 'view' ? (
        <div className='panel title-and-owner-panel'>
          <h3>List title: </h3>
          <input
            className='input-field input-field-large'
            placeholder='Enter list title'
            onChange={this.onChangeTitle}
            value = {this.state.title}/>
        </div>
      ):
      (
        <div className='panel title-and-owner-panel'>
          <h3>{this.state.title}</h3>
          { this.props.mode === 'view' &&
            this.state.owner === this.props.user.username ?
            <div>
              <h4>{
              this.state.isPrivate ?
              <i>private list</i> : ''
              }</h4>
              <button 
                className='btn'
                onClick={() => {
                  this.props.history.push(`/edit/${this.props.params.id}/`);
                  this.props.history.go(`/edit/${this.props.params.id}/`);
                  //window.location.href = `/edit/${this.props.params.id}/`
              }}>Edit list</button>
            </div> :
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
        <div className='link-content' key={'link-content' + n}>
          <div className='link-title' key={'title' + n}> 
            {link.needsRendering ?
              (<h4 key={`num${n}`}> {link.url}</h4>):
              (<h4 key={`num${n}`}> {link.title}</h4>)
            }
          </div>
          {link.needsRendering ?
            (<></>):
            (
            <div className='link-description' key={'desc' + n}>
              <img className='link-thumbnail'
              src={link.thumbnail}
              alt={link.url + ' thumbnail'}
              />
              <h5>{link.description}</h5>
            </div>
            )
            }
          <div className='link-hyperlink' key={'hlink' + n}>
            <h4><Link 
              className='hyperlink'
              key={`url${n}`}
              to = {`/redirect/${encodeURIComponent(link.url)}`}
              target = '_blank'>{link.url}</Link></h4>
          </div>
          {// edit and delete buttons
            this.props.mode === 'new' ||
            (this.props.mode === 'edit' &&
              this.props.user.username === this.state.owner)
            ? (
            <div className='links-buttons' key={'links-buttons ' + n}>
              <button
                className='btn'
                key={`edit${n}`}
                onClick={
                  () => this.renderEditLinkModal(n)
                }>Edit</button>
              <button
                className='btn btn-delete'
                  key={`del${n}`}
                  onClick={
                    () => this.linkAskDelete(link)
                  }>Delete</button>
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
      <div className='panel new-url-field'>
        <h4>Add URL: </h4>
        <input
          className='input-field input-field-large'
          placeholder = 'Enter URL'
          onChange = {this.onChangeNewURL}
          value = {this.state.newURL} />
      <button
        className='btn'
        onClick={
          () => this.linkAdd()
        }>Add</button>
      </div>
    ):
    <></>
  }

  renderEditLinkModal (n) {
    this.setState({
      isModalDisplayed: true,
      modalYesMethod: () => this.modalSave(n),
      modalYesText: 'Save',
      modalNoMethod: () => this.modalCancel(),
      modalNoText: 'Cancel',
      editedURL: '',
      modalBody: (
        <input
          className='input-field'
          onChange = {this.onChangeEditedURL}
          placeholder = 'Enter URL'
          ref = {modalInput => this.modalInput = modalInput}
        />
      ),
    })
  }

  renderSaveListPanel () {
    return (
    (this.props.mode === 'new' ||
    (this.props.mode === 'edit' &&
      this.props.user.username === this.state.owner)) ? (
      <div className='panel save-list-panel'>
        <button
         className='btn btn-large'
         onClick={
          this.linkListSave
        }>Save LinkList</button>
      </div>
    ): <></>
    )
  }

  renderDeleteListPanel () {
    return (
    (this.props.mode === 'edit' &&
      this.props.user.username === this.state.owner) ? (
      <div className='panel'>
        <button
         className='btn btn-large btn-delete'
         onClick={
          () => this.linkListAskDelete()
        }>Delete LinkList</button>
      </div>
    ): <></>
    )
  }
  //////////////////////////////////////

  render() {  
    let content = <h5>loading...</h5>

    if (this.state.isLoaded || this.props.mode === 'new') {
      content = (
        <div className='list-content'>
        {this.renderListTitlePanel()}
        {this.renderPrivacy()}
        {this.renderLinksPanel()}
        {this.renderAddURLPanel()}
        {this.renderSaveListPanel()}
        {this.renderDeleteListPanel()}
        <Modal
          show = {this.state.isModalDisplayed}
          modalYesMethod = {this.state.modalYesMethod}
          modalYesText = {this.state.modalYesText}
          modalNoMethod = {this.state.modalNoMethod}
          modalNoText = {this.state.modalNoText}
          body = {this.state.modalBody}
        />
        </div>
      );
    } else if (!this.state.isResponseOk) {
      content = this.state.errorMessage;
    }

    return (
      <div className='link-list-page'>
        {content}
      </div>
    )
  }
}

export default withRouter(LinkList);
