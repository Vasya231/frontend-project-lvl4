import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { generalChannelId } from 'constants';

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState: {
    id: null,
  },
  reducers: {
    setActiveChannel(state, action) {
      const { id } = action.payload;
      _.set(state, 'id', id);
    },
  },
  extraReducers: {
    'channels/deleteChannel': (state, action) => {
      const { id } = action.payload;
      const { id: currentChannelId } = state;
      if (id === currentChannelId) {
        _.set(state, 'id', generalChannelId);
      }
    },
  },
});

export const getActiveChannelId = (state) => state.activeChannel.id;

export const { setActiveChannel } = activeChannelSlice.actions;

export default activeChannelSlice.reducer;
