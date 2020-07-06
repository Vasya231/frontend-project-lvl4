import React from 'react';
import { connect } from 'react-redux';

import { showModal, hideModal } from 'features/modals/modalsSlice';
import ChannelDeleteConfirmationModal from 'features/modals/ChannelDeleteConfirmationModal';
import NewChannelModal from 'features/modals/NewChannelModal';
import ChannelRenameModal from 'features/modals/ChannelRenameModal';
import ErrorMessageModal from 'features/modals/ErrorMessageModal';

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
  newChannel: (modalProps, hideModalHandler) => (
    <NewChannelModal closeModal={hideModalHandler} />
  ),
  renameChannel: ({ channelId }, hideModalHandler) => (
    <ChannelRenameModal channelId={channelId} closeModal={hideModalHandler} />
  ),
  errorMessage: ({ errorMessage }, hideModalHandler) => (
    <ErrorMessageModal errorMessage={errorMessage} closeModal={hideModalHandler} />
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
