import { createSlice, createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

const selectActiveChannelId = (state) => state.activeChannel.id;
const selectMessageStorage = (state) => state.messages.byId;
const selectMessageIds = (state) => state.messages.ids;

export const selectVisibleMessages = createSelector(
  [selectMessageIds, selectMessageStorage, selectActiveChannelId],
  (ids, byId, activeChannelId) => {
    const orderedMessages = ids.map((id) => byId[id]);
    const visibleMessages = orderedMessages
      .filter(({ channelId }) => channelId === activeChannelId);
    return visibleMessages;
  },
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
