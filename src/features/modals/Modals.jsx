import React from 'react';
import { connect } from 'react-redux';

import { showModal, hideModal } from 'features/modals/modalsSlice';
import ChannelDeleteConfirmationModal from 'features/modals/ChannelDeleteConfirmationModal';

const mapStateToProps = (state) => ({
  type: state.modals.type,
  modalProps: state.modals.modalProps,
});

const actions = {
  showModal, hideModal,
};

const getModalComponent = {
  deleteChannelConfirmation: ({ channelId }, hideModalHandler) => (
    <ChannelDeleteConfirmationModal channelId={channelId} closeModal={hideModalHandler} />
  ),
};

const Modals = (props) => {
  const { type, modalProps, hideModal: hideModalHandler } = props;
  const modalComponent = getModalComponent[type];

  return (
    <>
      {modalComponent && modalComponent(modalProps, hideModalHandler)}
    </>
  );
};

export default connect(mapStateToProps, actions)(Modals);
