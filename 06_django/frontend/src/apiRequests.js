function apiSubmitNewList (listTitle, listLinks, listIsPrivate) {
  fetch('http://localhost:8000/api/lists/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
    },
    body: JSON.stringify({
      title: listTitle,
      links: listLinks,
      private: listIsPrivate,
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

export {apiSubmitNewList}