import React from 'react';
import './style.css';

export function getShareListModalBody (id, domainName) {
  return (
    <div className='prompt-and-input-field'>
      <div className='modal-share-list-body'>
      <h4>Link:</h4>
      <input
        className='input-field input-field-large'
        value = {`${domainName}/list/${id}/`}
        disabled = {true}
      ></input>
      </div>
    </div>
  )
}

export function Modal (props) {
  return (
      <div className={
        props.show ? "modal display-block" : "modal display-none"
      }>
        <div className='modal-main'>
          {props.body}
          <div className='modal-buttons'>
          <button
            onClick = {props.yesOnclick}
            className = 'btn btn-modal'>
              {props.yesText}
          </button>
          {
            props.noText !== '' ?
              <button
                onClick={props.noOnclick}
                className = 'btn btn-modal'>
                  {props.noText}
              </button> : <></>
          }
          </div>
        </div>
      </div>
  )
}