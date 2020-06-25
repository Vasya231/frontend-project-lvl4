import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    ids: [],
  },
  reducers: {
    addChannel(state, action) {
      const { channel } = action.payload;
      const { id } = channel;
      _.set(state.byId, id, channel);
      state.ids.push(id);
    },
  },
});

export const { addChannel } = channelsSlice;

export default channelsSlice.reducer;
