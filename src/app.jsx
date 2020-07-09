import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';
import faker from 'faker';
import Cookies from 'js-cookie';
import i18next from 'i18next';

import ChannelsWindow from 'features/channels/ChannelsWindow';
import MessageList from 'features/messages/MessageList';
import Modals from 'features/modals/Modals';
import { addMessage } from 'features/messages/messagesSlice';
import { addChannel, deleteChannel, renameChannel } from 'features/channels/channelsSlice';
import NewMessageForm from 'features/messages/NewMessageForm';
import AppContext from 'components/AppContext';
import rootReducer from './reducers';
import texts from './locales';

const startApp = async ({
  rootElement,
  initialState,
}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  const io = openSocket();

  if (!Cookies.get('chatUsername')) {
    Cookies.set('chatUsername', faker.name.findName());
  }
  const username = Cookies.get('chatUsername');

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
        <div className="row h-100 pb-3 d-flex">
          <ChannelsWindow />
          <div className="col-md-9 mh-100 d-flex flex-column justify-content-between chat-window mb-1">
            <MessageList />
            <div className="message-form">
              <NewMessageForm />
            </div>
          </div>
        </div>
        <Modals />
      </AppContext.Provider>
    </Provider>
  ), rootElement);
};

export default startApp;
