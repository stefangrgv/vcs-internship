import React from 'react';
import CreateEdit from './CreateEdit';
import View from './View';

import '../style.css';

function LinkList (props) {
  if (props.mode === 'view') {
    return <View/>
  }
  return <CreateEdit mode={props.mode}/>
}

export default LinkList;
