import { React, useState, useEffect } from 'react';
import { Link, useOutletContext, useMatch,
  useNavigate } from 'react-router-dom';

import { apiPostNewLink, apiListDelete } from '../apiRequests';
import { createShareModalBody } from '../Modal';
import { fetchAllLinks, fetchList } from './requests';
import Create from './Create';
import View from './View';
import Edit from './Edit';

import '../style.css';
import minimizeIcon from '../img/minimize.png';
import maximizeIcon from '../img/maximize.png';

function LinkList (props) {
  // const navigateToEdit = () => {
  //   navigate(`/edit/${match.params.id}/`);
  // }

  // const onClickShareLink = () => {
  //   context.showMessageModal(
  //     createShareModalBody(match.params.id, context.domainName));
  // }

  // const renderLinksPanel = () => { return (
  //     links.map((link, n) => { 
  //       if (link === undefined) {
  //         return <></>;
  //       }
  //       // link contents: title, description, thumbnail and url
  //       return (<div className='link-content' key={'link-content' + n}>
  //         {link.needsRendering ?
  //           (<div className='link-title' key={'title' + n}>
  //             <h4 key={`num${n}`}> {link.url}</h4>
  //           </div>):
  //           (<div className='link-title' key={'title' + n}>
  //             <h4 key={`num${n}`}> {link.title}</h4>
  //             {link.isMinimized ?
  //             <button
  //               className = 'img-btn img-btn-btn'
  //               onClick = {() => linkMinimizeMaximize(n)}>  {/* useEffect */}
  //             <img
  //               className = 'img-btn'
  //               alt = 'maximize'
  //               src = {maximizeIcon}/></button> :
  //             <button
  //               className = 'img-btn img-btn-btn'
  //               onClick = {() => linkMinimizeMaximize(n)}>  {/* useEffect */}
  //             <img
  //               className = 'img-btn'
  //               alt = 'minimize'
  //               src = {minimizeIcon}/></button>
  //             }</div>)}
  //         {link.needsRendering || link.isMinimized ?
  //           (<></>):
  //           (<div className='link-description' key={'desc' + n}>
  //             <img className='link-thumbnail'
  //             src={link.thumbnail}
  //             alt={link.url + ' thumbnail'}
  //             />
  //             <h5>{link.description}</h5>
  //           </div>)}
  //         <div className='link-hyperlink' key={'hlink' + n}>
  //           <h4><Link 
  //             className='hyperlink'
  //             key={`url${n}`}
  //             to = {`/redirect/${encodeURIComponent(link.url)}`}
  //             target = '_blank'>{link.url}</Link></h4>
  //         </div>
  //         {/* edit and delete buttons */}
  //         {props.mode === 'new' ||
  //           (props.mode === 'edit' && context.user.username === owner) ?
  //           (<div className='links-buttons' key={'links-buttons ' + n}>
  //             <button
  //               className='btn'
  //               key={`edit${n}`}
  //               onClick={
  //                 // useEffect
  //                 () => context.showQuestionModal(
  //                   <input
  //                     className='input-field input-field-large'
  //                     onChange = {onChangeEditedURL}
  //                     placeholder = 'Enter URL'
  //                   />,
  //                   'Save',
  //                   () => {
  //                     modalSave(n)
  //                   },
  //                   'Cancel',
  //                   () => {
  //                     setEditedURL('');
  //                     context.setModalBody();
  //                     context.hideModal();
  //                   }
  //                 )
  //               }>Edit</button>
  //             <button
  //               className='btn btn-delete'
  //                 key={`del${n}`}
  //                 // useEffect
  //                 onClick={
  //                   () => context.showQuestionModal(
  //                     'Are you sure you want to delete this link?',
  //                     'Yes',
  //                     () => {
  //                       deleteLink(link);
  //                       context.hideModal();
  //                     },
  //                     'No',
  //                   )
  //                 }>Delete</button>
  //           </div>): <></>}
  //       </div>
  //     )})
  //   )
  // }

  // const renderAddURLPanel = () => {
  //   return (props.mode !== 'view') ?
  //   (<div className='panel new-url-field'>
  //     <h4>Add URL: </h4>
  //     <input
  //       className='input-field input-field-large'
  //       placeholder = 'Enter URL'
  //       onChange = {onChangeNewURL}
  //       value = {newURL} />
  //   <button
  //     className='btn'
  //     onClick={addLink}>Add</button>
  //   </div>): <></>
  // }

  // const renderSaveListPanel = () => {
  //   return ((props.mode === 'new' ||
  //   (props.mode === 'edit' && context.user.username === owner)) ?
  //     (<div className='panel save-list-panel'>
  //       <button
  //        className='btn btn-large'
  //        onClick={linkListSave}>Save LinkList</button>
  //     </div>): <></>
  //   )
  // }

  // const renderDeleteListPanel = () => {
  //   return ((props.mode === 'edit' &&
  //     context.user.username === owner) ? (
  //     <div className='panel'>
  //       <button
  //        className='btn btn-large btn-delete'
  //       //  useeffects
  //        onClick={
  //         () => context.showQuestionModal(
  //           'Are you sure you want to delete this linklist?',
  //           'Yes',
  //           async () => {
  //             await apiListDelete(match.params.id, context.user, context.serverAddress);
  //             context.hideModal();
  //             navigate('/myprofile/');
  //           },
  //           'No'
  //       )}>Delete LinkList</button>
  //     </div>): <></>
  //   )
  // }

  // let content = <h5>loading...</h5>
  // if (isLoaded || props.mode === 'new') {
  //   if (props.mode === 'new' && context.user.username === null) {
  //     content = (<div className='error-message'>
  //       You are not logged in.</div>)
  //   } else {
  //     content = (<div className='list-content'>
  //       {renderListTitlePanel()}
  //       {renderPrivacy()}
  //       {renderLinksPanel()}
  //       {renderAddURLPanel()}
  //       {renderSaveListPanel()}
  //       {renderDeleteListPanel()}</div>);
  // }
  // } else if (!isResponseOk) {
  //   content = (<div className='error-message'>
  //     {errorMessage}</div>)
  // }

  switch (props.mode) {
    case 'new':
      return (<Create/>);
    case 'view':
      return (<View/>)
    case 'edit':
      return (<Edit/>)
  }
}

export default LinkList;
