import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import serverAPI from 'serverAPI';
import { showModal } from 'features/modals/modalsSlice';
import { channelNameMaxLength } from 'constants';
import { validateChannelName } from 'utils';

const actions = { openAnotherModal: showModal };

const ChannelRenameModal = (props) => {
  const { channelId, closeModal, openAnotherModal } = props;
  const handleClose = () => closeModal();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { channelName: '' },
    validate: validateChannelName,
    onSubmit: async ({ channelName }) => {
      const normalizedChannelName = channelName.trim();
      try {
        await serverAPI.renameChannel(channelId, normalizedChannelName);
        handleClose();
      } catch (e) {
        openAnotherModal({
          type: 'errorMessage',
          modalProps: {
            errorMessage: t('errors.network'),
          },
        });
      }
    },
  });
  const {
    handleSubmit, handleChange, isSubmitting, isValid, dirty, values,
  } = formik;

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input
            name="channelName"
            maxLength={channelNameMaxLength}
            type="text"
            className="mr-2"
            onChange={handleChange}
            value={values.channelName}
          />
          <Button type="submit" variant="primary" disabled={isSubmitting || !isValid || !dirty}>
            {t('renameChannelModal.submitButton')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, actions)(ChannelRenameModal);
