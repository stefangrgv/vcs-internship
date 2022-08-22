import React from 'react';
import './style.css';
import {DOMAINNAME} from './globalVariables';

function createShareModalBody (id) {
  return (
    <div className='prompt-and-input-field'>
      <div className='modal-share-list-body'>
        <h4>Link:</h4>
        <input className='input-field input-field-large' value={`${DOMAINNAME}/list/${id}/`} disabled={true}/>
      </div>
    </div>
  )
}

function Modal (props) {
  return (<div className={props.show ? 'modal display-block' : 'modal display-none'}>
    <div className='modal-main'>{props.body}
      <div className='modal-buttons'>
        <button onClick = {props.yesOnclick} className = 'btn btn-modal'>{props.yesText}</button>
        {props.noText !== '' ? <button onClick={props.noOnclick} className='btn btn-modal'>{props.noText}</button> : <></>}
      </div>
    </div>
  </div>)
}

export {Modal, createShareModalBody};