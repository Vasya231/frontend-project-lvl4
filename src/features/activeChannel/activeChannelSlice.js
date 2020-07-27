import { createSlice } from '@reduxjs/toolkit';

import { generalChannelId } from 'constants';

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState: null,
  reducers: {
    setActiveChannel(state, action) {
      const { id } = action.payload;
      return id;
    },
  },
  extraReducers: {
    'channels/deleteChannel': (state, action) => {
      const { id } = action.payload;
      if (id === state) {
        return generalChannelId;
      }
      return state;
    },
  },
});

export const getActiveChannelId = (state) => state.currentChannelId;

export const { setActiveChannel } = activeChannelSlice.actions;

export default activeChannelSlice.reducer;
