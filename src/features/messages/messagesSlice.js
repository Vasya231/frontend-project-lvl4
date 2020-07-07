import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

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
      const deletedMessagesIds = _.keys(messagesToDelete);
      _.pullAll(state.ids, deletedMessagesIds);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
