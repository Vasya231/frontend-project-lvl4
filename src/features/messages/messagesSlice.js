import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

import { addNewMessage } from 'serverAPI';

export const sendMessageToServer = createAsyncThunk(
  'messages/messageSendingStatus',
  async ({ text, author, channelId }) => {
    const message = await addNewMessage(text, author, channelId);
    return { message };
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
    [sendMessageToServer.fulfilled]: (state, action) => {
      const { message } = action.payload;
      const { id } = message;
      _.set(state.byId, id, message);
      state.ids.push(id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
