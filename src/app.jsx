import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import Chat from './components/Chat.jsx';
import rootReducer from './reducers';

const startApp = (rootElement, initialState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
  console.log(store);
  const { channels } = initialState;
  ReactDOM.render(<Chat channels={channels} />, rootElement);
  console.log(initialState);
};

export default startApp;
