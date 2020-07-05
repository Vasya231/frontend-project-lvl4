import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    modalProps: {},
  },
  reducers: {
    showModal(state, action) {
      return action.payload;
    },
    hideModal(state, action) {
      console.log(action.payload);
      return {
        type: null,
        modalProps: {},
      };
    },
  },
});

export const { showModal, hideModal } = modalsSlice.actions;

export default modalsSlice.reducer;
