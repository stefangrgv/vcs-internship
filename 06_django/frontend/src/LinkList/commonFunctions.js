import { apiGetList } from '../apiRequests';

function fetchList (
  id,
  context,
  setTitle,
  setLinks,
  setOwner,
  setPrivate,
  setResponseOk,
  setErrorMessage
) {
  apiGetList(id, context.user).then((response) => {
    if (response.status === 200) {
      setTitle(response.data.title);
      setLinks(response.data.links);
      setOwner(response.data.owner);
      setPrivate(response.data.private);
      setResponseOk(true);
    } else {
      const errorStatus = response.response.status;
      let message = response.message;
      if (errorStatus === 401) {
        message = 'You are not logged in.';
      } else if (errorStatus === 403) {
        message = 'Permission denied: this list is private.';
      } else if (errorStatus === 404) {
        message = 'This link does not exist.';
      }
      setErrorMessage(message);
    }
  });
}

const formatURLInput = (input) => {
  // Formats the URL to be properly handled by the DB
  let parsedURL = input.replace('www.', '');
  while (parsedURL.startsWith('/')) {
    parsedURL = parsedURL.slice(1);
  }

  if (!parsedURL.startsWith('http://') && !parsedURL.startsWith('https://')) {
    parsedURL = 'http://' + parsedURL;
  }

  parsedURL = encodeURI(parsedURL);

  return parsedURL;
};

const isLinkEmpty = (url) => {
  return url.replaceAll(' ', '') === '';
};

const isLinkAlreadyPresent = (url, links) => {
  return links.find((l) => l.url === formatURLInput(url));
};

export { fetchList, formatURLInput, isLinkEmpty, isLinkAlreadyPresent };
