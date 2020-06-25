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
});

export const { setActiveChannel } = activeChannelSlice;

export default activeChannelSlice.reducer;
