import axios from "axios";
import { closeModal } from "./Modal";

const serverPort = 8000;
const serverAddress = `${window.location.protocol}//${window.location.hostname}:${serverPort}`;

export function apiSubmitNewList (obj) {
  axios.post(`${serverAddress}/api/lists/`, {
      title: obj.state.title,
      links: obj.state.links,
      private: obj.state.isPrivate,
    }, { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${obj.props.user.token}`,
      }
  })
  .then((response) => {
    window.location.href = `/list/${response.data.id}/`
  }, (error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalNoText: '',
      modalBody: error.message,
    });
  })
}

export function apiSubmitEditedList (obj) {
  axios.put(
    `${serverAddress}/api/lists/${obj.props.params.id}/`, {
      title: obj.state.title,
      links: obj.state.links,
      private: obj.state.isPrivate,
    }, { headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${obj.props.user.token}`,
       }
  })
  .then((response) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => window.location.href = `/list/${obj.props.params.id}/`,
      modalYesText: 'OK',
      modalBody: 'Success!',
      modalNoText: '',
    })
  }, (error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalBody: error.message,
      modalNoText: '',
    });
  })
}

export function apiListDelete (obj, id, redirectTo = null) {
  axios.delete(
    `${serverAddress}/api/lists/${id}`,
    { headers: {
        'Authorization': `Token ${obj.props.user.token}`,
    }}
  )
  .then((response) => {
    if (redirectTo !== null) {
      window.location.href = redirectTo;
    } else {
      obj.setState({
        isLoaded: false,
        isModalDisplayed: true,
        modalYesMethod: () => closeModal(obj),
        modalYesText: 'OK',
        modalNoText: '',
        modalBody: 'List deleted successfully.',
      });
    }
  }, (error) => {
    let message = error.message;
    if (error.response.status === 401) {
      message = 'You are not logged in.';
    } else if (error.response.status === 403) {
      message = 'Permission denied: you do not own this list.';
    } else if (error.response.status === 404) {
      message = 'List not found!';
    }
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalNoText: '',
      modalBody: message,
    });
  })
}

export function apiLoadLinkList (obj) {
  axios.get(
    `${serverAddress}/api/lists/${obj.props.params.id}/`, {
    headers: {
      'Authorization': `Token ${obj.props.user.token}`,
  }})
  .then((response) => {
    obj.setState({
      title: response.data.title,
      links: response.data.links,
      owner: response.data.owner,
      isPrivate: response.data.private,
      isLoaded: true,
      isResponseOk: true,
    })
  }, (error) => {
    let message = error.message;
    if (error.response.status === 401) {
      message = 'You are not logged in.';
    } else if (error.response.status === 403) {
      message = 'Permission denied: this list is private.';
    } else if (error.response.status === 404) {
      message = 'List not found!';
    }
    obj.setState({
      errorMessage: message
    });
  })
}

export function apiGetAllLinks (obj) {
  axios.get(`${serverAddress}/api/links/`, {
    headers: {
      'Authorization': `Token ${obj.props.user.token}`,
  }})
  .then((response) => {
    obj.setState({
      allLinks: response.data,
      isFetchingLinks: false,
    });
  }, (error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalNoText: '',
      modalBody: error.message,
    });
  })
}

export function apiPostNewLink (obj, url) {
  axios.post(`${serverAddress}/api/links/`,
    {'url': url}, { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${obj.props.user.token}`,
    }
  })
  .then((response) => {
    apiGetAllLinks(obj);
  }, (error) => {
    let message = error.message;
    if (error.response.status === 400) {
      message = 'This website is not reachable. Ensure the URL is correct.';
    } else if (error.response.status > 400) {
      message = 'Error in posting link data to server!';
    }
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalNoText: '',
      modalBody: message,
    });
  })
}

export function apiUserLogout (obj) {
  axios.post(`${serverAddress}/api/auth/logout/`)
  .then(() => {
    window.location.href = '/';
  }, (error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalNoText: '',
      modalBody: error.message,
    });
  })
}

export function apiUserGet (obj) {
  axios.get(`${serverAddress}/api/user/${obj.props.user.username}/`,{
    headers: {'Authorization': `Token ${obj.props.user.token}`}
  })
  .then((response) => {
    if (response.status >= 400) {
      throw new Error('Error in getting user data!');
    }
    obj.setState({
      email: response.data.email,
      linklists: response.data.linklists,
      isLoaded: true,
    })
  })
}

export function apiUserLogin (obj) {
  axios.post(`${serverAddress}/api/auth/login/`, {
    'username': obj.state.username,
    'password': obj.state.password,
  }, { headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }})
  .then((response) => {
    localStorage.setItem('kodjalinkUsername', obj.state.username);
    localStorage.setItem('kodjalinkUserToken', response.data.key);
    window.location.href = '/myprofile/';
  }, (error) => {
    let message = error.message;
    if (error.response.status === 400) {
      message = 'Incorrect username or password!';
    } else if (error.response.status > 400) {
      message = 'Error in request to server.';
    }
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalNoText: '',
      modalBody: message,
    });
  })
}

export function apiFetchAllUsers (obj) {
  axios.get(`${serverAddress}/api/allusers/`)
  .then((response) => {
    return response.data.reduce((usernames, user) => {
      usernames.push(user['username']);
      return(usernames);
    }, []);
  }, (error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalNoText: '',
      modalBody: error.message,
    });
  })
}

export function apiPostNewUser(obj) {
  axios.post(`${serverAddress}/api/createuser/`, {
    'username': obj.state.username,
    'password': obj.state.passwordOne,
    'email': obj.state.email,
  }, { headers: {
    'Content-Type': 'application/json',
  }})
  .then((response) => {
    window.location.href = '/login/';
  }, (error) => {
    const errorContents = JSON.parse(error.request.response);
    let message;
    if (typeof(errorContents.username) !== 'undefined') {
      message = `Error in username field: ${errorContents.username}`;
    } else if (typeof(errorContents.email) !== 'undefined') {
      message = `Error in email field: ${errorContents.email}`;
    } else {
      message = errorContents;
    }
    
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalNoText: '',
      modalBody: message,
    });
  })
}

export function apiChangePassword(obj) {
  axios.post(`${serverAddress}/api/auth/password/change/`, {
    new_password1: obj.state.newPasswordOne,
    new_password2: obj.state.newPasswordTwo,
    old_password: obj.state.oldPassword,
  }, { headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Token ${obj.props.user.token}`,
  }})
  .then((response) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => {
        closeModal(obj);
        window.location.href = '/myprofile/';
      },
      modalYesText: 'OK',
      modalNoText: '',
      modalBody: 'Success!',
    });
  }, (error) => {
    let message = error.message;
    if (error.response.status === 400) {
      message = 'Old password is not correct!';
    }
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalNoText: '',
      modalBody: message,
    });
  })
}