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
    hideModal() {
      return {
        type: null,
        modalProps: {},
      };
    },
  },
});

export const getModalProps = (state) => state.modals.modalProps;

export const getModalType = (state) => state.modals.type;

export const { showModal, hideModal } = modalsSlice.actions;

export default modalsSlice.reducer;
