import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTranslation } from 'react-i18next';

import connect from 'connect';
import { getChannelList, getCurrentChannelId } from 'features/channels/channelsSlice';

const ChannelList = (props) => {
  const {
    setCurrentChannel, showModal,
  } = props;

  const { t } = useTranslation();
  const channels = useSelector(getChannelList);
  const activeChannelId = useSelector(getCurrentChannelId);

  const handleDeleteChannel = (id) => () => {
    showModal({
      type: 'deleteChannelConfirmation',
      modalProps: {
        channelId: id,
      },
    });
    return false;
  };

  const handleRenameChannel = (id) => () => showModal({
    type: 'renameChannel',
    modalProps: {
      channelId: id,
    },
  });

  const handleSwitchChannel = (id) => () => setCurrentChannel({ id });

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

export default connect(ChannelList);
