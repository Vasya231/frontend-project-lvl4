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
    deleteChannel(state, action) {
      const { id } = action.payload;
      _.unset(state.byId, id);
      _.pull(state.ids, id);
    },
    renameChannel(state, action) {
      const { channel } = action.payload;
      const { id } = channel;
      _.set(state.byId, id, channel);
    },
  },
});

export const { addChannel, deleteChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
