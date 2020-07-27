import { createSlice, createSelector } from '@reduxjs/toolkit';

import { getActiveChannelId } from 'features/activeChannel/activeChannelSlice';

export const getMessages = (state) => state.messages;

export const selectVisibleMessages = createSelector(
  [getMessages, getActiveChannelId],
  (messages, activeChannelId) => messages
    .filter(({ channelId }) => channelId === activeChannelId),
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
