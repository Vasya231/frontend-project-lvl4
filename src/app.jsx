import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';
import i18next from 'i18next';


import { addMessage } from 'features/messages/messagesSlice';
import { addChannel, deleteChannel, renameChannel } from 'features/channels/channelsSlice';
import App from 'components/App';
import AppContext from 'components/AppContext';
import rootReducer from './reducers';
import texts from './locales';

const startApp = async ({
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

  io.on('newChannel', (data) => {
    const { data: { attributes: channel } } = data;
    store.dispatch(addChannel({ channel }));
  });

  io.on('removeChannel', (data) => {
    const { data: { id } } = data;
    store.dispatch(deleteChannel({ id }));
  });

  io.on('renameChannel', (data) => {
    const { data: { attributes: channel } } = data;
    store.dispatch(renameChannel({ channel }));
  });

  await i18next.init({
    lng: 'en',
    debug: true,
    resources: texts,
  });

  ReactDOM.render((
    <Provider store={store}>
      <AppContext.Provider value={{ username }}>
        <App />
      </AppContext.Provider>
    </Provider>
  ), rootElement);
};

export default startApp;
