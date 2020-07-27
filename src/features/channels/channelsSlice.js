import { createSlice, createSelector } from '@reduxjs/toolkit';

import { generalChannelId } from 'constants';

export const getChannelList = (state) => state.channels.channelList;

export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const getCurrentChannelName = createSelector(
  [getCurrentChannelId, getChannelList],
  (currentChannelId, channelList) => channelList.find(({ id }) => (id === currentChannelId)).name,
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channelList: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel(state, action) {
      const { channel } = action.payload;
      state.channelList.push(channel);
    },
    deleteChannel(state, action) {
      const { id: deletedChannelId } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.channelList = state.channelList.filter(({ id }) => (id !== deletedChannelId));
      if (state.currentChannelId === deletedChannelId) {
        // eslint-disable-next-line no-param-reassign
        state.currentChannelId = generalChannelId;
      }
    },
    renameChannel(state, action) {
      const { channel } = action.payload;
      const { id: renamedChannelId } = channel;
      const renamedChannelIndex = state.channelList
        .findIndex(({ id }) => (id === renamedChannelId));
      // eslint-disable-next-line no-param-reassign
      state.channelList[renamedChannelIndex] = channel;
    },
    setCurrentChannel(state, action) {
      const { id } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = id;
    },
  },
});

export const {
  addChannel, deleteChannel, renameChannel, setCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
