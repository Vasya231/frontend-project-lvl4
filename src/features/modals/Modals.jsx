import React from 'react';
import { useSelector } from 'react-redux';

import connect from 'connect';
import { getModalType, getModalProps } from 'features/modals/modalsSlice';
import ChannelDeleteConfirmationModal from 'features/modals/ChannelDeleteConfirmationModal';
import NewChannelModal from 'features/modals/NewChannelModal';
import ChannelRenameModal from 'features/modals/ChannelRenameModal';
import ErrorMessageModal from 'features/modals/ErrorMessageModal';

const modalComponents = {
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
  const { hideModal: hideModalHandler } = props;
  const type = useSelector(getModalType);
  const modalProps = useSelector(getModalProps);
  const modalComponent = modalComponents[type];

  return (
    <>
      {modalComponent && modalComponent(modalProps, hideModalHandler)}
    </>
  );
};

export default connect(Modals);
