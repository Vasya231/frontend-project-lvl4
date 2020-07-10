import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field,
} from 'formik';
import { useTranslation } from 'react-i18next';

import serverAPI from 'serverAPI';
import { showModal } from 'features/modals/modalsSlice';
import { channelNameMaxLength } from 'constants';

const actions = { openAnotherModal: showModal };

const ChannelRenameModal = (props) => {
  const { channelId, closeModal, openAnotherModal } = props;
  const handleClose = () => closeModal();
  const { t } = useTranslation();

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannelModal.title')}</Modal.Title>
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
              await serverAPI.renameChannel(channelId, values.channelName);
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
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <Field name="channelName" maxLength={channelNameMaxLength} type="text" className="mr-2" />
              <Button type="submit" variant="primary" disabled={isSubmitting || !isValid || !dirty}>
                {t('renameChannelModal.submitButton')}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, actions)(ChannelRenameModal);
