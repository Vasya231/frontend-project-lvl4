import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

import serverAPI from 'serverAPI';
import { showModal } from 'features/modals/modalsSlice';

const actions = { openAnotherModal: showModal };

const ChannelDeleteConfirmationModal = (props) => {
  const { t } = useTranslation();

  const { closeModal, channelId, openAnotherModal } = props;
  const [isSubmitting, setSubmitting] = useState(false);
  const handleDelete = (id) => async () => {
    setSubmitting(true);
    try {
      await serverAPI.deleteChannel(id);
      setSubmitting(false);
      closeModal();
    } catch (e) {
      setSubmitting(false);
      openAnotherModal({
        type: 'errorMessage',
        modalProps: {
          errorMessage: t('errors.network'),
        },
      });
    }
  };
  const handleClose = () => closeModal();

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('deleteChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('deleteChannelModal.question')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>{t('deleteChannelModal.cancelButton')}</Button>
        <Button disabled={isSubmitting} variant="primary" onClick={handleDelete(channelId)}>{t('deleteChannelModal.deleteButton')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null, actions)(ChannelDeleteConfirmationModal);
