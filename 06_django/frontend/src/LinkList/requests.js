import {apiGetAllLinks, apiLoadLinkList} from '../apiRequests';

function fetchAllLinks (context) {
    apiGetAllLinks(context.user)
    .then((response) => { 
      if (response.status === 200) {
        console.log('fetched')
        return response;
      } else {
        context.showMessageModal(response.message);
      }
    });
  }

  function fetchList (id, context, setTitle, setLinks,
    setOwner, setPrivate, setLoaded, setResponseOk, setErrorMessage) {
    apiLoadLinkList(id, context.user)
    .then((response) => {
      if (response.status === 200) {
        setTitle(response.data.title);
        setLinks(response.data.links);
        setOwner(response.data.owner);
        setPrivate(response.data.private);
        setLoaded(true);
        setResponseOk(true);
      } else {
        let message = response.message;
        if (response.response.status === 401) {
          message = 'You are not logged in.';
        } else if (response.response.status === 403) {
          message = 'Permission denied: this list is private.';
        } else if (response.response.status === 404) {
          message = 'List not found!';
        }
        setErrorMessage(message);
      }
    });
  }

  export {fetchAllLinks, fetchList};