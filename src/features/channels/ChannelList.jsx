import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Navbar from 'react-bootstrap/Navbar';
import i18next from 'i18next';

import { setActiveChannel, getActiveChannelId } from 'features/activeChannel/activeChannelSlice';
import { showModal } from 'features/modals/modalsSlice';
import { selectChannels } from 'features/channels/channelsSlice';

import NewChannelButton from './NewChannelButton';

const mapStateToProps = (state) => ({
  channels: selectChannels(state),
  activeChannelId: getActiveChannelId(state),
});

const actions = {
  switchChannel: setActiveChannel,
  openModal: showModal,
};

const ChannelList = (props) => {
  const {
    activeChannelId, channels, switchChannel, openModal,
  } = props;

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
      <DropdownButton as={ButtonGroup} alignRight variant={buttonVariant} title="" id="dropdown-channel-actions">
        <Dropdown.Item onClick={handleDeleteChannel(id)} as="button">{i18next.t('channelsWindow.deleteChannel')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel(id)} as="button">{i18next.t('channelsWindow.renameChannel')}</Dropdown.Item>
      </DropdownButton>
    );

    return (
      <div key={id} className="btn-group d-flex list-group-item">
        <Button
          variant={buttonVariant}
          onClick={handleSwitchChannel(id)}
          className=""
        >
          {name}
        </Button>
        {removable && dropdownElement}
      </div>
    );
  };

  return (
    <Navbar bg="ligt" expand="md" className="h-100 d-flex flex-md-column w-100">
      <Navbar.Brand href="#home">{i18next.t('channelsWindow.title')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="channels-navbar-nav" />
      <Navbar.Collapse id="channels-navbar-nav" className="h-100 w-100">
        <div className="mr-auto d-flex flex-column h-100 w-100">
          <div className="d-flex flex-column flex-grow-1 w-100 list-group overflow-auto">
            {channels.map(generateChannelElement)}
          </div>
          <div className="mt-1">
            <NewChannelButton />
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default connect(mapStateToProps, actions)(ChannelList);
