import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import i18next from 'i18next';

const ErrorMessageModal = (props) => {
  const { closeModal, errorMessage } = props;
  const handleClose = () => closeModal();

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{i18next.t('errorMessageModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>{i18next.t('errorMessageModal.okButton')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorMessageModal;
