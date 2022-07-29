import React from 'react';
import './App.css';


class Modal extends React.Component {
  render () {
    return(
        <div className={
          this.props.show ? "modal display-block" : "modal display-none"
        }>
            {this.props.body}
            <button onClick={this.props.handleSave}>
                Save
            </button>
        </div>
    )
  }
}


export default Modal;