import React from 'react';
import { connect, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTranslation } from 'react-i18next';

import { setActiveChannel, getActiveChannelId } from 'features/activeChannel/activeChannelSlice';
import { showModal } from 'features/modals/modalsSlice';
import { getChannels } from 'features/channels/channelsSlice';

const actions = {
  switchChannel: setActiveChannel,
  openModal: showModal,
};

const ChannelList = (props) => {
  const {
    switchChannel, openModal,
  } = props;

  const { t } = useTranslation();
  const channels = useSelector(getChannels);
  const activeChannelId = useSelector(getActiveChannelId);

  const handleDeleteChannel = (id) => () => {
    openModal({
      type: 'deleteChannelConfirmation',
      modalProps: {
        channelId: id,
      },
    });
    return false;
  };

  const handleRenameChannel = (id) => () => openModal({
    type: 'renameChannel',
    modalProps: {
      channelId: id,
    },
  });

  const handleSwitchChannel = (id) => () => switchChannel({ id });

  const generateChannelElement = (channel) => {
    const { id, name, removable } = channel;
    const isActive = (id === activeChannelId);
    const buttonVariant = isActive ? 'success' : 'primary';
    const dropdownElement = (
      <DropdownButton as={ButtonGroup} variant={buttonVariant} title="" id="dropdown-channel-actions">
        <Dropdown.Item onClick={handleDeleteChannel(id)} as="button">{t('channelsWindow.deleteChannel')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel(id)} as="button">{t('channelsWindow.renameChannel')}</Dropdown.Item>
      </DropdownButton>
    );

    return (
      <li className="list-group-item" key={id}>
        <div className="btn-group d-flex">
          <Button
            variant={buttonVariant}
            onClick={handleSwitchChannel(id)}
            className=""
          >
            {name}
          </Button>
          {removable && dropdownElement}
        </div>
      </li>
    );
  };

  return (
    <ul className="list-group overflow-auto">{channels.map(generateChannelElement)}</ul>
  );
};

export default connect(null, actions)(ChannelList);
