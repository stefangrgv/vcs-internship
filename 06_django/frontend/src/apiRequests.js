export function apiSubmitNewList (obj) {
  fetch('http://localhost:8000/api/lists/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
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
    window.location.href = `/${data.id}/`
  })
  .catch((error) => {
    alert(error);
  });
}

export function apiSubmitEdittedList (obj) {
  fetch(`http://localhost:8000/api/lists${obj.state.linkListId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
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
        alert('Saved!')
        window.location.href = `/${obj.state.linkListId}/`
      })
      .catch((error) => {
        alert(error);
      });
}

export function apiListDelete (obj, id) {
  fetch(`http://localhost:8000/api/lists/${id}`, {
    method: 'delete',
    headers: new Headers({
      'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
    })
  })
  .then(response => {
  if (response.ok) {
    obj.setState({
        isLoaded: false,
    });
    alert('List deleted successfully.');
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
    console.log(error);
  });
}

export function apiLoadLinkList (obj) {
  fetch(`http://localhost:8000/api/lists${obj.state.linkListId}`, {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
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
    console.log(error)
    obj.setState({
      errorMessage: error.message,
    });
  });
}

export function apiGetAllLinks (obj) {
  fetch('http://localhost:8000/api/links/', {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
    }),
  })
  .then((response) => {
    if (response.ok) {
      return (response.json());
    }
    throw new Error('Error in fetching link data from server!');
  })
  .then((data) => {
    console.log('all links fetched ')
    obj.setState({
      allLinks: data,
    });
  })
  .catch((error) => {
    console.error(error)
  })
}

export function apiPostNewLink (obj, url) {
  fetch('http://localhost:8000/api/links/', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
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
  .catch((error) => alert(error))
}

export function apiUserLogout () {
  fetch('http://localhost:8000/auth/logout/', {
    method: 'POST',
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error in fetching data from server. Check your connection.');
    }
  })
  .then(() => {
    window.location.reload(false);
  })
  .catch((error) => {
    console.error(error);
  })
}

export function apiUserGet (obj, username) {
  fetch(`http://localhost:8000/api/user/${username}/`, {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
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
  fetch('http://localhost:8000/auth/login/', {
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
    window.location.href = '/';
  })
  .catch((error) => {
    alert(error);
  })
}
