import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { apiPostNewLink } from '../../apiRequests';


const AddLinkPanel = (props) => {
  const context = useOutletContext();
  const [newURL, setNewURL] = useState('');

  const addLink = () => {
    if (props.isLinkNotEmptyOrPresent(newURL)) {
      const parsedURL = props.formatURLInput(newURL)
      // if link is not present in the db, add it
      if (!props.allLinks.find((l) => l.url === parsedURL)) {
        apiPostNewLink(context.user, parsedURL)
        .then((response) => {
          // response will typically yield an error if the url is invalid
          if (response.response?.status >= 400) {
            const errorContents = JSON.parse(response.request.response);
            // context.showMessageModal(
            //   errorContents.url !== undefined ? errorContents.url : response.message)
            return;
          }
        });
      }
      props.setLinks([...props.links, {url: parsedURL, needsRendering: true}]); 
      setNewURL('');
    }
  }

  const onChangeNewURL = (event) => {
    setNewURL(event.target.value);
  }

  return (
    <div className='panel new-url-field'>
      <h4>Add URL: </h4>
      <input
        className='input-field input-field-large'
        placeholder = 'Enter URL'
        onChange = {onChangeNewURL}
        value = {newURL} />
      <button
        className='btn'
        onClick={addLink}>Add</button>
    </div>
  )
}

export default AddLinkPanel;