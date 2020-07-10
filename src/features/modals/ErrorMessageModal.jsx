import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const ErrorMessageModal = (props) => {
  const { closeModal, errorMessage } = props;
  const handleClose = () => closeModal();
  const { t } = useTranslation();

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('errorMessageModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>{t('errorMessageModal.okButton')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorMessageModal;
