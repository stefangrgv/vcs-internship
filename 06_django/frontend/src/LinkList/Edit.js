// import { React, useState, useEffect } from 'react';
// import { useMatch, useNavigate, useOutletContext } from 'react-router-dom';

// import { fetchAllLinks, fetchList } from './requests';
// import { trimLinkTitle,  updateLinkInfo} from './functions';
// import { apiSubmitEditedList } from '../apiRequests';

// const Edit = (props) => {
//   const context = useOutletContext();
//   const match = useMatch(`/${props.mode === 'edit' ? 'edit' : 'list'}/:id`);
//   const navigate = useNavigate();

//   const [isResponseOk, setResponseOk] = useState(false);
//   const [isLoaded, setLoaded] = useState(false);
//   const [isFetchingLinks, setFetchingLinks] = useState(false);
//   const [editedURL, setEditedURL] = useState('');
//   const [allLinks, setAllLinks] = useState([]);
//   const [isPrivate, setPrivate] = useState(false);
//   const [owner, setOwner] = useState('');
//   const [links, setLinks] = useState([]);
//   const [title, setTitle] = useState('');
//   const [newURL, setNewURL] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect( () => {
//     fetchAllLinks(context, setAllLinks, setFetchingLinks);
//   }, []);

//   useEffect( () => {
//     if (isLoaded &&
//         links.find((l) => l.needsRendering &&
//         !isFetchingLinks)) {
//       let newLinks = links.map((link) => {
//         if (link.needsRendering) {
//           let linkDbEntry = updateLinkInfo(link.url);
//           if (linkDbEntry === undefined) {
//             setFetchingLinks(true);
//             fetchAllLinks(context, setAllLinks, setFetchingLinks);
//             return link;
//           }
//           return linkDbEntry;
//         } else {
//           return link;
//         }
//       });
//       setLinks(newLinks);
//     }
//   });





//   return (
//     <div>Edit</div>
//   )
// }

// export default Edit;