import { closeModal } from "./Modal";

export function apiSubmitNewList (obj) {
  fetch('http://localhost:8000/api/lists/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + obj.props.user.token,
    },
    body: JSON.stringify({
      title: obj.state.title,
      links: obj.state.links,
      private: obj.state.isPrivate,
    })
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Server request failed!');
    }
  })
  .then((data) => {
    window.location.href = `/list/${data.id}/`
  })
  .catch((error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalBody: error.message,
    });
  });
}

export function apiSubmitEditedList (obj) {
  fetch(`http://localhost:8000/api/lists/${obj.props.params.id}/`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + obj.props.user.token,
        },
        body: JSON.stringify({
          title: obj.state.title,
          links: obj.state.links,
          private: obj.state.isPrivate,
        })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Server request failed!');
        }
      })
      .then((data) => {
        obj.setState({
          isModalDisplayed: true,
          modalYesMethod: () => window.location.href = `/list/${obj.props.params.id}/`,
          modalYesText: 'OK',
          modalBody: 'Success!',
        });
      })
      .catch((error) => {
        obj.setState({
          isModalDisplayed: true,
          modalYesMethod: () => closeModal(obj),
          modalYesText: 'OK',
          modalBody: error.message,
        });
      });
}

export function apiListDelete (obj, id, redirectTo = null) {
  fetch(`http://localhost:8000/api/lists/${id}`, {
    method: 'delete',
    headers: new Headers({
      'Authorization': 'Token ' + obj.props.user.token,
    })
  })
  .then(response => {
  if (response.ok) {
    obj.setState({
        isLoaded: false,
    });
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalBody: 'List deleted successfully.',
    });
    if (redirectTo !== null) {
      window.location.href = redirectTo;
      return;
    }
    return response.json();
  }
  // if response is not ok
  obj.setState({
    isResponseOk: false,
  });
  if (response.status === 401) {
    throw new Error('You are not logged in.')
  }
  if (response.status === 403) {
    throw new Error('Permission denied: you do not own this list.')
  }
  if (response.status === 404) {
    throw new Error('List not found!')
  }
  })
  .catch((error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalBody: error.message,
    });
  });
}

export function apiLoadLinkList (obj) {
  console.log(obj.props)
  fetch(`http://localhost:8000/api/lists/${obj.props.params.id}/`, {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Token ' + obj.props.user.token,
    })
  })
  .then((response) => {
    if (response.ok) {
      obj.setState({
        isResponseOk: true,
      });
      return response.json();
    }
    // if response is not ok
    obj.setState({
      isResponseOk: false,
    });
    if (response.status === 401) {
      throw new Error('You are not logged in.')
    }
    if (response.status === 403) {
      throw new Error('Permission denied: this list is private.')
    }
    if (response.status === 404) {
      throw new Error('List not found!')
    }
  })
  .then((data) => {
    if (data !== null) {
      obj.setState({
        title: data.title,
        links: data.links,
        owner: data.owner,
        isPrivate: data.private,
        isLoaded: true,
      });
    }
  })
  .catch((error) => {
    obj.setState({
      errorMessage: error.message,
    });
  });
}

export function apiGetAllLinks (obj) {
  fetch('http://localhost:8000/api/links/', {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Token ' + obj.props.user.token,
    }),
  })
  .then((response) => {
    if (response.ok) {
      return (response.json());
    }
    throw new Error('Error in fetching link data from server!');
  })
  .then((data) => {
    obj.setState({
      allLinks: data,
      isFetchingLinks: false,
    });
  })
  .catch((error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalBody: error.message,
    });
  })
}

export function apiPostNewLink (obj, url) {
  fetch('http://localhost:8000/api/links/', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + obj.props.user.token,
    }),
    body: JSON.stringify({
      'url': url,
    })
  })
  .then((response) => {
    if (response.ok) {
      apiGetAllLinks(obj);
      return (response.json());
    }
    if (response.status === 400) {
      throw new Error('This website is not reachable. Ensure the URL is correct.')
    }
    throw new Error('Error in posting link data to server!');
  })
  .catch((error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalBody: error.message,
    });
  })
}

export function apiUserLogout (obj) {
  fetch('http://localhost:8000/api/auth/logout/', {
    method: 'POST',
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error in fetching data from server. Check your connection.');
    }
  })
  .then(() => {
    window.location.href = '/';
  })
  .catch((error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalBody: error.message,
    });
  })
}

export function apiUserGet (obj) {
  fetch(`http://localhost:8000/api/user/${obj.props.user.username}/`, {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Token ' + obj.props.user.token,
    })
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Error in getting user data!');
  })
  .then((data) => {
    obj.setState({
      email: data.email,
      linklists: data.linklists,
      isLoaded: true,
    })
  })
}

export function apiUserLogin (obj) {
  fetch('http://localhost:8000/api/auth/login/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username': obj.state.username,
      'password': obj.state.password,
    })
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    if (response.status === 400) {
      throw new Error('Incorrect username or password!')
    }
    throw new Error('Error in request to server.')
  })
  .then((data) => {
    localStorage.setItem('kodjalinkUsername', obj.state.username);
    localStorage.setItem('kodjalinkUserToken', data.key);
    window.location.href = '/myprofile/';
  })
  .catch((error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalBody: error.message,
    });
  })
}

export function apiFetchAllUsers (obj) {
  fetch('http://localhost:8000/api/allusers/')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Error in fetching data from server! Please check your connection.');
  })
  .then((data) => {
    let names = data.reduce((usernames, user) => {
      usernames.push(user['username']);
      return(usernames);
    }, []);
    return names
  })
  .catch((error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalBody: error.message,
    });
  })
}

export function apiPostNewUser(obj) {
  fetch('http://localhost:8000/api/createuser/', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    'username': obj.state.username,
    'password': obj.state.passwordOne,
    'email': obj.state.email,
    })
  })
  .then((response) => {
    if (response.ok) {
      window.location.href = '/login/';
    } else if (response.status === 400) {
      throw new Error('A user with that name already exists!');
    } else {
      throw new Error('Server request failed!');
    }
  })
  .catch((error) => {
    obj.setState({
      isModalDisplayed: true,
      modalYesMethod: () => closeModal(obj),
      modalYesText: 'OK',
      modalBody: error.message,
    });
  });
}

export function apiChangePassword(obj) {
  fetch('http://localhost:8000/api/auth/password/change/', {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + obj.props.user.token,
          }),
        body: JSON.stringify({
          new_password1: obj.state.newPasswordOne,
          new_password2: obj.state.newPasswordTwo,
          old_password: obj.state.oldPassword,
        })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 400) {
          throw new Error('Old password is not correct!');
        }
        throw new Error('Error in request to server.');
      })
      .then((data) => {
        obj.setState({
          isModalDisplayed: true,
          modalYesMethod: () => {
            closeModal(obj);
            window.location.href = '/myprofile/';
          },
          modalYesText: 'OK',
          modalBody: 'Success!',
        });
      })
      .catch((error) => {
        obj.setState({
          isModalDisplayed: true,
          modalYesMethod: () => closeModal(obj),
          modalYesText: 'OK',
          modalBody: error.message,
        });
      })
}