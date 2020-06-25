import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import ChannelList from 'features/channels/ChannelList';
import MessageList from 'features/messages/MessageList';
import { addMessage } from 'features/messages/messagesSlice';
import rootReducer from './reducers';


const startApp = (rootElement, initialState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  ReactDOM.render((
    <Provider store={store}>
      <div className="row">
        <ChannelList />
        <MessageList />
      </div>
    </Provider>
  ), rootElement);
  console.log(initialState);
  setTimeout(() => {
    store.dispatch(addMessage({
      message: {
        id: 1,
        text: 'blahblah',
        channelId: 1,
        author: 'Vasya',
      },
    }));
    console.log('add message dispatched');
  }, 10000);
};

export default startApp;
