import ReactDOM from 'react-dom';
import React from 'react';
import Chat from './components/Chat.jsx';

const startApp = (rootElement, initialState) => {
  ReactDOM.render(<Chat />, rootElement);
  console.log(initialState);
};

export default startApp;
