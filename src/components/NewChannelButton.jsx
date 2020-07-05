import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import i18next from 'i18next';

import { showModal } from 'features/modals/modalsSlice';

const actions = {
  showModal,
};

const NewChannelModal = (props) => {
  const handleOpenModal = () => props.showModal({
    type: 'newChannel',
    modalProps: {},
  });
  return (
    <Button className="w-100" variant="primary" onClick={handleOpenModal}>
      {i18next.t('channelsWindow.addChannelButton')}
    </Button>
  );
};

export default connect(null, actions)(NewChannelModal);
