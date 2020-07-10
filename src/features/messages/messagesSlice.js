import { createSlice, createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

import { selectActiveChannelId } from 'features/activeChannel/activeChannelSlice';

export const selectMessageStorage = (state) => state.messages.byId;
export const selectMessageIds = (state) => state.messages.ids;

export const selectOrderedMessages = createSelector(
  [selectMessageIds, selectMessageStorage],
  (ids, byId) => ids.map((id) => byId[id]),
);

export const selectVisibleMessages = createSelector(
  [selectOrderedMessages, selectActiveChannelId],
  (orderedMessages, activeChannelId) => orderedMessages
    .filter(({ channelId }) => channelId === activeChannelId),
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    byId: {},
    ids: [],
  },
  reducers: {
    addMessage(state, action) {
      const { message } = action.payload;
      const { id } = message;
      _.set(state.byId, id, message);
      state.ids.push(id);
    },
  },
  extraReducers: {
    'channels/deleteChannel': (state, action) => {
      const { id: deletedChannelId } = action.payload;
      const messagesToDelete = _.pickBy(
        state.byId,
        ({ channelId }) => (channelId === deletedChannelId),
      );
      const deletedMessagesIds = _.keys(messagesToDelete).map(Number);
      _.pullAll(state.ids, deletedMessagesIds);
      deletedMessagesIds.forEach((id) => _.unset(state.byId, id));
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
