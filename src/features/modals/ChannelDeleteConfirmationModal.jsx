import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import i18next from 'i18next';

import serverAPI from 'serverAPI';
import { showModal } from 'features/modals/modalsSlice';

const actions = { openAnotherModal: showModal };

const ChannelDeleteConfirmationModal = (props) => {
  const { closeModal, channelId, openAnotherModal } = props;
  const handleDelete = (id) => async () => {
    try {
      await serverAPI.deleteChannel(id);
      closeModal();
    } catch (e) {
      openAnotherModal({
        type: 'errorMessage',
        modalProps: {
          errorMessage: i18next.t('errors.network'),
        },
      });
    }
  };
  const handleClose = () => closeModal();

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{i18next.t('deleteChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {i18next.t('deleteChannelModal.question')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>{i18next.t('deleteChannelModal.cancelButton')}</Button>
        <Button variant="primary" onClick={handleDelete(channelId)}>{i18next.t('deleteChannelModal.deleteButton')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null, actions)(ChannelDeleteConfirmationModal);