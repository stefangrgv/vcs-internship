import axios from 'axios';
import { SERVERADDRESS } from './globalVariables';

function apiSubmitNewList (user, title, links, isPrivate) {
  return axios.post(`${SERVERADDRESS}/api/lists/`, {
    title: title,
    links: links,
    private: isPrivate,
  }, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${user.token}`,
  }}).catch((error) => {
    return error
  });
}

function apiSubmitEditedList (id, user, title, links, isPrivate) {
  return axios.put(
    `${SERVERADDRESS}/api/lists/${id}/`, {
      title: title,
      links: links,
      private: isPrivate,
    }, { headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${user.token}`,
       }
  }).catch((error) => {
    return error;
  })
}

function apiListDelete (id, user) {
  return axios.delete(
    `${SERVERADDRESS}/api/lists/${id}`,
    { headers: {
        'Authorization': `Token ${user.token}`,
    }}
  ).catch((error) => {
    return error;
  })
}

function apiLoadLinkList (id, user) {
  return axios.get(
    `${SERVERADDRESS}/api/lists/${id}/`, {
    headers: {
      'Authorization': `Token ${user.token}`,
  }}).catch((error) => {
    return error;
  })
}

function apiGetAllLinks (user) {
  return axios.get(`${SERVERADDRESS}/api/links/`, {
    headers: {
      'Authorization': `Token ${user.token}`,
  }}).catch((error) => {
    return error;
  })
}

function apiPostNewLink (user, url) {
  return axios.post(`${SERVERADDRESS}/api/links/`,
    {'url': url}, { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${user.token}`,
    }
  }).catch((error) => {
    return error;
  })
}

function apiUserLogout () {
  return axios.post(`${SERVERADDRESS}/api/auth/logout/`)
  .catch((error) => {
    return error;
  });
}

function apiUserLogin (username, password) {
  return axios.post(`${SERVERADDRESS}/api/auth/login/`, {
    'username': username,
    'password': password,
  }, { headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }}).catch((error) => {
    return error;
  })
}

function apiUserGet (username, token) {
  return axios.get(`${SERVERADDRESS}/api/user/${username}/`,{
    headers: {'Authorization': `Token ${token}`}
  }).catch((error) => {
    return error;
  })
}

function apiPostNewUser(username, password, email) {
  return axios.post(`${SERVERADDRESS}/api/createuser/`, {
    'username': username,
    'password': password,
    'email': email,
  }, { headers: {
    'Content-Type': 'application/json',
  }}).catch((error) => {
    return error;
  })
}

function apiChangePassword(user, oldPassword, newPasswordOne, newPasswordTwo) {
  return axios.post(`${SERVERADDRESS}/api/auth/password/change/`, {
    new_password1: newPasswordOne,
    new_password2: newPasswordTwo,
    old_password: oldPassword,
  }, { headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Token ${user.token}`,
  }}).catch((error) => {
    return error;
  })
}

export {
  apiSubmitNewList,
  apiSubmitEditedList,
  apiListDelete,
  apiLoadLinkList,
  apiGetAllLinks,
  apiPostNewLink,
  apiUserLogout,
  apiUserGet,
  apiUserLogin,
  apiPostNewUser,
  apiChangePassword
}
