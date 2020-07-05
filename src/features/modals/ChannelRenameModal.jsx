import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field,
} from 'formik';

import serverAPI from 'serverAPI';

const ChannelRenameModal = (props) => {
  const { channelId, closeModal } = props;
  const handleClose = () => closeModal();

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter new name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            await serverAPI.renameChannel(channelId, values.channelName);
            setSubmitting(false);
            handleClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="channelName" type="text" className="mr-2" />
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                Rename channel
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelRenameModal;
