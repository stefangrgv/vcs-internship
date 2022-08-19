// import { apiPostNewLink } from "../apiRequests";
// import { fetchAllLinks } from "./requests";





// const deleteLink = (link, links, setLinks) => {
//   setLinks(links.filter((l) => {
//     return l !== link;
//   }));
// }



// const renderPrivacyToggle = (isPrivate, onChangePrivacy) => {
//   return (<div className='panel privacy-panel'>
//     <h3>Is this a private list: </h3>
//     <input
//       type = 'checkbox'
//       checked = {isPrivate}
//       onChange = {onChangePrivacy}/>
//   </div>)
// }

// const renderListTitlePanelView = (context, title, owner, isPrivate, navigateToEdit, onClickShareLink) => {
//   return(<div className='panel title-and-owner-panel'>
//       <h3 className = 'list-title-privacy'>{title}</h3>
//       {owner === context.user.username ?
//         <><h5 className = 'list-title-privacy'>{
//           isPrivate ? 'private list' : ''}</h5>
//           <button
//             className='btn'
//             onClick={navigateToEdit}>Edit list</button>
//         </> : <></> }
//         <button 
//           className='btn'
//           onClick={onClickShareLink}>Share list</button>
//     </div>)
// }

// const renderListTitlePanelCreateEdit = (title, onChangeTitle) => {
//   return(<div className='panel title-and-owner-panel'>
//       <h3>List title: </h3>
//       <input
//         className='input-field input-field-large'
//         placeholder='Enter list title'
//         onChange={onChangeTitle}
//         value = {title}/>
//     </div>)
// }

// const saveLink = (n, context, editedURL, setEditedURL, links, setLinks, allLinks, setAllLinks, setFetchingLinks) => {
//   if (isLinkNotEmptyOrPresent(editedURL)) {
//     let parsedURL = formatURLInput(editedURL);
//     if (!allLinks.find((l) => l.url === parsedURL)) {
//       apiPostNewLink(context.user, parsedURL, context.serverAddress)
//       .then((response) => {
//         if (response.response?.status >= 400) {
//           const errorContents = JSON.parse(response.request.response);
//           context.showMessageModal(
//             errorContents.url !== undefined ? errorContents.url : response.message)
//           return;
//         }
//       });
//       fetchAllLinks(context, setAllLinks, setFetchingLinks);
//     }

//     let newLinks = links.slice();
//     newLinks[n] = {
//       url: parsedURL,
//       title: parsedURL,
//       id: n,
//       description: 'loading...',
//       thumbnail: '',
//       needsRendering: true
//     };

//     context.hideModal();
//     setLinks(newLinks);
//     setEditedURL('');
//   }
// }

// export {isLinkNotEmptyOrPresent, addLink, deleteLink, updateLinkInfo, renderPrivacyToggle,
//   renderListTitlePanelCreateEdit, renderListTitlePanelView, saveLink};