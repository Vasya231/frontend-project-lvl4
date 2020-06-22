import ReactDOM from 'react-dom';
import React from 'react';
import Chat from './components/Chat.jsx';

const startApp = (rootElement, initialState) => {
  const { channels } = initialState;
  ReactDOM.render(<Chat channels={channels} />, rootElement);
  console.log(initialState);
};

export default startApp;
