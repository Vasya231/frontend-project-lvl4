import { createSlice, createSelector } from '@reduxjs/toolkit';

import { getActiveChannelId } from 'features/activeChannel/activeChannelSlice';

export const getChannels = (state) => state.channels;

export const getActiveChannelName = createSelector(
  [getActiveChannelId, getChannels],
  (activeChannelId, channels) => channels.find(({ id }) => (id === activeChannelId)).name,
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, action) {
      const { channel } = action.payload;
      state.push(channel);
    },
    deleteChannel(state, action) {
      const { id: deletedChannelId } = action.payload;
      return state.filter(({ id }) => (id !== deletedChannelId));
    },
    renameChannel(state, action) {
      const { channel } = action.payload;
      const { id: renamedChannelId } = channel;
      const renamedChannelIndex = state.findIndex(({ id }) => (id === renamedChannelId));
      // eslint-disable-next-line no-param-reassign
      state[renamedChannelIndex] = channel;
    },
  },
});

export const { addChannel, deleteChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
