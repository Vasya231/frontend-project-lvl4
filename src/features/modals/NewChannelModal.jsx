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

const NewChannelModal = (props) => {
  const { closeModal, openAnotherModal } = props;
  const handleClose = () => closeModal();

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{i18next.t('addChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          validate={({ channelName }) => {
            if (!channelName) {
              return { channelName: 'Required' };
            }
            return {};
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await serverAPI.addChannel(values.channelName);
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
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <Field name="channelName" type="text" maxLength={settings.channelNameMaxLength} className="mr-2" />
              <Button type="submit" variant="primary" disabled={isSubmitting || !isValid || !dirty}>
                {i18next.t('addChannelModal.addChannelButton')}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, actions)(NewChannelModal);
