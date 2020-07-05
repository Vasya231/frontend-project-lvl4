import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field,
} from 'formik';
import i18next from 'i18next';

import serverAPI from 'serverAPI';

const NewChannelModal = (props) => {
  const { closeModal } = props;
  const handleClose = () => closeModal();

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{i18next.t('addChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            await serverAPI.addChannel(values.channelName);
            setSubmitting(false);
            handleClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="channelName" type="text" className="mr-2" />
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {i18next.t('addChannelModal.addChannelButton')}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default NewChannelModal;
