import { configureStore } from '@reduxjs/toolkit';
import 'regenerator-runtime/runtime';

import rootReducer from '../src/reducers';
import { addMessage } from '../src/features/messages/messagesSlice';
import { addChannel } from '../src/features/channels/channelsSlice';
import { setActiveChannel } from '../src/features/activeChannel/activeChannelSlice';

const message1 = {
  id: 1,
  text: 'blahblah',
  author: 'Vasya',
  channelId: 1,
};

const message2 = {
  id: 2,
  text: '.....',
  author: 'Petya',
  channelId: 1,
};

const newChannel = {
  id: 1,
  name: 'general',
};

const store = configureStore({
  reducer: rootReducer,
});

test('should have initial state', () => {
  const state = store.getState();
  expect(state).toMatchObject({
    activeChannel: {
      id: null,
    },
    entities: {
      channels: {
        byId: {},
        ids: [],
      },
      messages: {
        byId: {},
        ids: [],
      },
    },
  });
});

test('test sync actions', () => {
  store.dispatch(addChannel({ channel: newChannel }));
  store.dispatch(setActiveChannel({ id: newChannel.id }));
  store.dispatch(addMessage({ message: message1 }));
  store.dispatch(addMessage({ message: message2 }));
  const state = store.getState();
  expect(state).toMatchObject({
    activeChannel: {
      id: newChannel.id,
    },
    entities: {
      channels: {
        byId: {
          [newChannel.id]: newChannel,
        },
        ids: [newChannel.id],
      },
      messages: {
        byId: {
          [message1.id]: message1,
          [message2.id]: message2,
        },
        ids: [message1.id, message2.id],
      },
    },
  });
});
