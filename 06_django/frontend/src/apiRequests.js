import axios from 'axios';

import { SERVERADDRESS } from './globalVariables';

axios.defaults.baseURL = SERVERADDRESS;

function apiPostNewList (user, title, links, isPrivate) {
  return axios
    .post(
      '/api/lists/',
      {
        title: title,
        links: links,
        private: isPrivate,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
      }
    )
    .catch((error) => {
      return error;
    });
}

function apiPutEditedList (id, user, title, links, isPrivate) {
  return axios
    .put(
      `/api/lists/${id}/`,
      {
        title: title,
        links: links,
        private: isPrivate,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
      }
    )
    .catch((error) => {
      return error;
    });
}

function apiDeleteList (id, user) {
  return axios
    .delete(`/api/lists/${id}`, {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    })
    .catch((error) => {
      return error;
    });
}

function apiGetList (id, user) {
  return axios
    .get(`/api/lists/${id}/`, {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    })
    .catch((error) => {
      return error;
    });
}

function apiGetAllLinks (user) {
  return axios
    .get(`/api/links/`, {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    })
    .catch((error) => {
      return error;
    });
}

function apiPostNewLink (user, url) {
  return axios
    .post(
      '/api/links/',
      { url: url },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
      }
    )
    .catch((error) => {
      return error;
    });
}

function apiLogoutUser () {
  return axios.post('/api/auth/logout/').catch((error) => {
    return error;
  });
}

function apiLoginUser (username, password) {
  return axios
    .post(
      '/api/auth/login/',
      {
        username: username,
        password: password,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    .catch((error) => {
      return error;
    });
}

function apiGetUser (username, token) {
  return axios
    .get(`/api/user/${username}/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .catch((error) => {
      return error;
    });
}

function apiPostNewUser (username, password, email) {
  return axios
    .post(
      '/api/createuser/',
      {
        username: username,
        password: password,
        email: email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .catch((error) => {
      return error;
    });
}

function apiChangePassword (user, oldPassword, newPasswordOne, newPasswordTwo) {
  return axios
    .post(
      '/api/auth/password/change/',
      {
        new_password1: newPasswordOne,
        new_password2: newPasswordTwo,
        old_password: oldPassword,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
      }
    )
    .catch((error) => {
      return error;
    });
}

export {
  apiPostNewList,
  apiPutEditedList,
  apiDeleteList,
  apiGetList,
  apiGetAllLinks,
  apiPostNewLink,
  apiLogoutUser,
  apiGetUser,
  apiLoginUser,
  apiPostNewUser,
  apiChangePassword,
};
