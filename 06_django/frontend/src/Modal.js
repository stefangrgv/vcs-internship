import React from 'react';
import './App.css';


class Modal extends React.Component {
  render () {
    return(
        <div className={
          this.props.show ? "modal display-block" : "modal display-none"
        }>
          <div className='modal-main'>
            {this.props.body}
            <button onClick={this.props.modalSave}>
                Save
            </button>
            <button onClick={this.props.modalCancel}>
              Cancel
            </button>
          </div>
        </div>
    )
  }
}


export default Modal;