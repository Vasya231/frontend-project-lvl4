import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';
import faker from 'faker';
import Cookies from 'js-cookie';

import ChannelList from 'features/channels/ChannelList';
import MessageList from 'features/messages/MessageList';
import Modals from 'features/modals/Modals';
import { sendMessageToServer, addMessage } from 'features/messages/messagesSlice';
import { addChannel, deleteChannel } from 'features/channels/channelsSlice';
import rootReducer from './reducers';
import NewMessageForm from './components/NewMessageForm';
import AppContext from './components/AppContext';
import NewChannelButton from './components/NewChannelButton';


const startApp = ({
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

  ReactDOM.render((
    <Provider store={store}>
      <AppContext.Provider value={{ username }}>
        <div className="row h-100">
          <div className="col-3 h-100 d-flex flex-column">
            <ChannelList />
            <div className="mt-auto">
              <NewChannelButton />
            </div>
          </div>
          <div className="col-7 h-100 d-flex flex-column">
            <MessageList />
            <div className="mt-auto">
              <NewMessageForm />
            </div>
          </div>
        </div>
        <Modals />
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
