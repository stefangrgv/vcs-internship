import React from 'react';
import './style.css';

export function closeModal (obj) {
  obj.setState( {
    isModalDisplayed: false,
  } )
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