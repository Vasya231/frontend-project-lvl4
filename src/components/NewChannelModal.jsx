import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field,
} from 'formik';

import serverAPI from 'serverAPI';

const NewChannelModal = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button className="w-100" variant="primary" onClick={handleShow}>
        Add channel
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter channel name</Modal.Title>
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
                  Add channel
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewChannelModal;
