import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field,
} from 'formik';
import i18next from 'i18next';

import serverAPI from 'serverAPI';
import { showModal } from 'features/modals/modalsSlice';
import settings from 'settings';

const actions = { openAnotherModal: showModal };

const ChannelRenameModal = (props) => {
  const { channelId, closeModal, openAnotherModal } = props;
  const handleClose = () => closeModal();

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{i18next.t('renameChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await serverAPI.renameChannel(channelId, values.channelName);
              setSubmitting(false);
              handleClose();
            } catch (e) {
              openAnotherModal({
                type: 'errorMessage',
                modalProps: {
                  errorMessage: i18next.t('errors.network'),
                },
              });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="channelName" maxLength={settings.channelNameMaxLength} type="text" className="mr-2" />
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {i18next.t('renameChannelModal.submitButton')}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, actions)(ChannelRenameModal);