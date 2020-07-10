import { createSlice, createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

const selectChannelIds = (state) => (state.channels.ids);
const selectChannelStorage = (state) => (state.channels.byId);

export const selectChannels = createSelector(
  [selectChannelIds, selectChannelStorage],
  (ids, byId) => ids.map((id) => byId[id]),
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    ids: [],
  },
  reducers: {
    addChannel(state, action) {
      const { channel, channel: { id } } = action.payload;
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
