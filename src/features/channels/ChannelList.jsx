import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import i18next from 'i18next';

import { setActiveChannel, getActiveChannelId } from 'features/activeChannel/activeChannelSlice';
import { showModal } from 'features/modals/modalsSlice';
import { selectChannels } from 'features/channels/channelsSlice';

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
      <DropdownButton as={ButtonGroup} variant={buttonVariant} title="" id="dropdown-channel-actions">
        <Dropdown.Item onClick={handleDeleteChannel(id)} as="button">{i18next.t('channelsWindow.deleteChannel')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel(id)} as="button">{i18next.t('channelsWindow.renameChannel')}</Dropdown.Item>
      </DropdownButton>
    );

    return (
      <div key={id} className="btn-group d-flex">
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
    <Navbar bg="ligt" expand="md" className="h-100 d-flex flex-md-column w-100 overflow-auto">
      <Navbar.Brand href="#home">Channels</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="w-100">
        <Nav className="mr-auto d-flex flex-column h-100 mh-100 w-100">
          {channels.map(generateChannelElement)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default connect(mapStateToProps, actions)(ChannelList);
