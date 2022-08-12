import React from 'react';
import './style.css';

export function closeModal (obj) {
  obj.setState( {
    isModalDisplayed: false,
  } )
}

export function shareList (obj, id, domainName) {
  obj.setState({
    isModalDisplayed: true,
    modalYesMethod: () => {
      closeModal(obj);
    },
    modalYesText: 'OK',
    modalBody: (
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
    ),
    modalNoText: '',
  });
}

export class Modal extends React.Component {
  render () {
    return(
        <div className={
          this.props.show ? "modal display-block" : "modal display-none"
        }>
          <div className='modal-main'>
            {this.props.body}
            <div className='modal-buttons'>
            <button
              autoFocus
              onClick = {this.props.modalYesMethod}
              className = 'btn btn-modal'>
                {this.props.modalYesText}
            </button>
            {
              this.props.modalNoText ?
                <button
                  onClick={this.props.modalNoMethod}
                  className = 'btn btn-modal'>
                    {this.props.modalNoText}
                </button> : <></>
            }
            </div>
          </div>
        </div>
    )
  }
}