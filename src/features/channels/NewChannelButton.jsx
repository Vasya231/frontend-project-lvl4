import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

import { showModal } from 'features/modals/modalsSlice';

const actions = {
  showModal,
};

const NewChannelModal = (props) => {
  const handleOpenModal = () => props.showModal({
    type: 'newChannel',
    modalProps: {},
  });

  const { t } = useTranslation();

  return (
    <Button className="w-100" variant="primary" onClick={handleOpenModal}>
      {t('channelsWindow.addChannelButton')}
    </Button>
  );
};

export default connect(null, actions)(NewChannelModal);
