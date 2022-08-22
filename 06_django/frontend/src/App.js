import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import { Modal } from './Modal';
import User from './user';
import './style.css';
import {SERVERADDRESS} from './globalVariables';

function App (props) {
  const user = new User(SERVERADDRESS);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBody, setModalBody] = useState('');
  const [modalYesOnclick, setModalYesOnclick] = useState();
  const [modalYesText, setModalYesText] = useState('');
  const [modalNoOnclick, setModalNoOnclick] = useState();
  const [modalNoText, setModalNoText] = useState('');

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
    user,
    showMessageModal,
    showQuestionModal,
    hideModal,
    setModalVisible,
    setModalBody,
    setModalYesOnclick,
    setModalYesText,
    setModalNoOnclick,
    setModalNoText
  }

  return (<>
    <Header context = {context}/>
    <Outlet context = {context}/>
    <Modal show = {modalVisible} body = {modalBody} yesOnclick = {modalYesOnclick}
      yesText = {modalYesText} noOnclick = {modalNoOnclick} noText = {modalNoText}/>
  </>)
}

export default App;
