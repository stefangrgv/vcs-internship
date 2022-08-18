import { React, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Modal } from './Modal';
import User from './user';
import './style.css';

function App (props) {
  const domainName = window.location.origin;
  const serverPort = 8000;
  const serverAddress = `${window.location.protocol}//${window.location.hostname}:${serverPort}`;
  let user = new User(serverAddress);

  let [modalVisible, setModalVisible] = useState(false);
  let [modalBody, setModalBody] = useState('');
  let [modalYesOnclick, setModalYesOnclick] = useState();
  let [modalYesText, setModalYesText] = useState('');
  let [modalNoOnclick, setModalNoOnclick] = useState();
  let [modalNoText, setModalNoText] = useState('');

  const showModal = () => () => { // remove if not used
    setModalVisible(true);
  }

  const hideModal = () => () => {
    setModalVisible(false);
  }

  const showMessageModal = (body) => {
    setModalVisible(true);
    setModalBody(body);
    setModalYesText('OK');
    setModalYesOnclick(hideModal);
    setModalNoText('');
  }

  const showQuestionModal = (body, yesText, yesOnclick, noText, noOnclick = hideModal) => {
    setModalVisible(true);
    setModalBody(body);
    setModalYesText(yesText);
    setModalYesOnclick(yesOnclick);
    setModalNoText(noText);
    setModalNoOnclick(noOnclick);
  }

  const context = {
    domainName,
    serverAddress,
    user,
    showMessageModal,
    showQuestionModal,
    showModal,
    hideModal,
    setModalVisible,
    setModalBody,
    setModalYesOnclick,
    setModalYesText,
    setModalNoOnclick,
    setModalNoText
  }

  return (
  <>
    <Header
      context = {context}
    />
    <Outlet
      context = {context}
    />
    <Modal
      show = {modalVisible}
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
