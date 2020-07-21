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

const NewChannelModal = (props) => {
  const { closeModal, openAnotherModal } = props;
  const handleClose = () => closeModal();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { channelName: '' },
    validate: validateChannelName,
    onSubmit: async ({ channelName }, { setSubmitting }) => {
      const normalizedChannelName = channelName.trim();
      try {
        await serverAPI.addChannel(normalizedChannelName);
        setSubmitting(false);
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
    isSubmitting, isValid, dirty, handleChange, handleSubmit, values,
  } = formik;

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input
            name="channelName"
            type="text"
            maxLength={channelNameMaxLength}
            className="mr-2"
            onChange={handleChange}
            value={values.channelName}
          />
          <Button type="submit" variant="primary" disabled={isSubmitting || !isValid || !dirty}>
            {t('addChannelModal.addChannelButton')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, actions)(NewChannelModal);
