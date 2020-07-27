import { createSlice, createSelector } from '@reduxjs/toolkit';

import { getCurrentChannelId } from 'features/channels/channelsSlice';

export const getMessages = (state) => state.messages;

export const selectVisibleMessages = createSelector(
  [getMessages, getCurrentChannelId],
  (messages, currentChannelId) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      const { message } = action.payload;
      state.push(message);
    },
  },
  extraReducers: {
    'channels/deleteChannel': (state, action) => {
      const { id: deletedChannelId } = action.payload;
      return state.filter(({ channelId }) => (channelId !== deletedChannelId));
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
