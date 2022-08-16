import axios from "axios";

const closeModal = () => {

}

const serverPort = 8000;
const serverAddress = `${window.location.protocol}//${window.location.hostname}:${serverPort}`;

export function apiSubmitNewList (user, title, links, isPrivate) {
  return axios.post(`${serverAddress}/api/lists/`, {
      title: title,
      links: links,
      private: isPrivate,
    }, { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${user.token}`,
      }
  }).catch((error) => {
    return error
  });
}

export function apiSubmitEditedList (id, user, title, links, isPrivate) {
  return axios.put(
    `${serverAddress}/api/lists/${id}/`, {
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

export function apiListDelete (id, user) {
  return axios.delete(
    `${serverAddress}/api/lists/${id}`,
    { headers: {
        'Authorization': `Token ${user.token}`,
    }}
  ).catch((error) => {
    return error;
  })
}

export function apiLoadLinkList (id, user) {
  return axios.get(
    `${serverAddress}/api/lists/${id}/`, {
    headers: {
      'Authorization': `Token ${user.token}`,
  }}).catch((error) => {
    return error;
  })
}

export function apiGetAllLinks (user) {
  return axios.get(`${serverAddress}/api/links/`, {
    headers: {
      'Authorization': `Token ${user.token}`,
  }}).catch((error) => {
    return error;
  })
}

export function apiPostNewLink (user, url) {
  return axios.post(`${serverAddress}/api/links/`,
    {'url': url}, { headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${user.token}`,
    }
  }).catch((error) => {
    return error;
  })
}

export function apiUserLogout () {
  return axios.post(`${serverAddress}/api/auth/logout/`);
}

export function apiUserGet (username, token) {
  return axios.get(`${serverAddress}/api/user/${username}/`,{
    headers: {'Authorization': `Token ${token}`}
  }).catch((error) => {
    return error;
  })
}

export function apiUserLogin (username, password) {
  return axios.post(`${serverAddress}/api/auth/login/`, {
    'username': username,
    'password': password,
  }, { headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }}).catch((error) => {
    return error;
  })
}

export function apiPostNewUser(username, password, email) {
  return axios.post(`${serverAddress}/api/createuser/`, {
    'username': username,
    'password': password,
    'email': email,
  }, { headers: {
    'Content-Type': 'application/json',
  }}).catch((error) => {
    return error;
  })
}

export function apiChangePassword(user, oldPassword, newPasswordOne, newPasswordTwo) {
  return axios.post(`${serverAddress}/api/auth/password/change/`, {
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