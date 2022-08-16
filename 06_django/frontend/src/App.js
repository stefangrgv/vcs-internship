import { React, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Modal } from './Modal';
import './style.css';

function App (props) {
  let [modalShow, setModalShow] = useState(false);
  let [modalBody, setModalBody] = useState('');
  let [modalYesOnclick, setModalYesOnclick] = useState();
  let [modalYesText, setModalYesText] = useState('');
  let [modalNoOnclick, setModalNoOnclick] = useState();
  let [modalNoText, setModalNoText] = useState('');

  const modalChange = {
    setModalShow,
    setModalBody,
    setModalYesOnclick,
    setModalYesText,
    setModalNoOnclick,
    setModalNoText
  }

  return (
  <>
    <Header
      user = {props.user}
      modalChange = {modalChange}
    />
    <Outlet
     context = {modalChange}
    />
    <Modal
      show = {modalShow}
      body = {modalBody}
      yesOnclick = {modalYesOnclick}
      yesText = {modalYesText}
      noOnclick = {modalNoOnclick}
      noText = {modalNoText}
    />
  </>
  )
}

export default App;
