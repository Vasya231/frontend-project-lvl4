import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState: {
    id: 0,
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
        _.set(state, 'id', 1);
      }
    },
  },
});

export const { setActiveChannel } = activeChannelSlice.actions;

export default activeChannelSlice.reducer;
