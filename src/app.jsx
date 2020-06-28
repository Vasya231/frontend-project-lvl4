import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';

import ChannelList from 'features/channels/ChannelList';
import MessageList from 'features/messages/MessageList';
import { sendMessageToServer, addMessage } from 'features/messages/messagesSlice';
import rootReducer from './reducers';
import NewMessageForm from './components/NewMessageForm';
import AppContext from './components/AppContext';

const startApp = ({
  rootElement,
  initialState,
  username,
}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  const io = openSocket();

  io.on('newMessage', (data) => {
    const { data: { attributes: newMessage } } = data;
    store.dispatch(addMessage({ message: newMessage }));
  });

  ReactDOM.render((
    <Provider store={store}>
      <AppContext.Provider value={{ username }}>
        <div className="row">
          <ChannelList />
          <MessageList />
        </div>
        <NewMessageForm />
      </AppContext.Provider>
    </Provider>
  ), rootElement);

  setTimeout(() => {
    store.dispatch(sendMessageToServer(
      {
        text: 'blahblah',
        channelId: 1,
        author: 'Vasya',
      },
    ));
    console.log('send message dispatched');
  }, 10000);
};

export default startApp;
