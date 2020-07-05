import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import serverAPI from 'serverAPI';

const ChannelDeleteConfirmationModal = (props) => {
  const { closeModal, channelId } = props;
  const handleDelete = (id) => async () => {
    await serverAPI.deleteChannel(id);
    closeModal();
  };
  const handleClose = () => closeModal();

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Channel deletion confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you really want to delete channel?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleDelete(channelId)}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChannelDeleteConfirmationModal;
