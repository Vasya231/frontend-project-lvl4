import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';

import routes from 'routes';

export const sendMessageToServer = createAsyncThunk(
  'messages/messageSendingStatus',
  async (message) => {
    const { channelId } = message;
    const response = await axios.post(
      routes.channelMessagesPath(channelId),
      { data: { attributes: { ...message } } },
    );
    console.log(response);
    return { message: response.data.data.attributes };
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
