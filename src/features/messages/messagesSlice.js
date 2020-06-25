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
});

export const { addMessage } = messagesSlice;

export default messagesSlice.reducer;
