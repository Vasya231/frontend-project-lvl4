import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import ChannelList from 'features/channels/ChannelList';
import MessageList from 'features/messages/MessageList';
import rootReducer from './reducers';

const startApp = (rootElement, initialState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  ReactDOM.render((
    <Provider store={store}>
      <ChannelList />
      <MessageList />
    </Provider>
  ), rootElement);
  console.log(initialState);
};

export default startApp;
