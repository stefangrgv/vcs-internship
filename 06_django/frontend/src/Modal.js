import React from 'react';
import './App.css';

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
            <button
              onClick = {this.props.modalYesMethod}
              className = 'btn modal-btn'>
                {this.props.modalYesText}
            </button>
            {
              this.props.modalNoText ?
                <button
                  onClick={this.props.modalNoMethod}
                  className = 'btn modal-btn'>
                    {this.props.modalNoText}
                </button> : <></>
            }
          </div>
        </div>
    )
  }
}