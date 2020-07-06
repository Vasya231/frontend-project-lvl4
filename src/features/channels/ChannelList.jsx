import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import i18next from 'i18next';

import { setActiveChannel } from 'features/activeChannel/activeChannelSlice';
import { showModal } from 'features/modals/modalsSlice';
// import serverAPI from 'serverAPI';

const selectChannelIds = (state) => (state.channels.ids);
const selectChannelStorage = (state) => (state.channels.byId);

const selectChannels = createSelector(
  [selectChannelIds, selectChannelStorage],
  (ids, byId) => ids.map((id) => byId[id]),
);

const mapStateToProps = (state) => ({
  channels: selectChannels(state),
});

const actions = {
  switchChannel: setActiveChannel,
  openModal: showModal,
};

const ChannelList = (props) => {
  const { channels, switchChannel, openModal } = props;

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
    const dropdownElement = (
      <DropdownButton as={ButtonGroup} id="dropdown-channel-actions">
        <Dropdown.Item onClick={handleDeleteChannel(id)} as="button">{i18next.t('channelsWindow.deleteChannel')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel(id)} as="button">{i18next.t('channelsWindow.renameChannel')}</Dropdown.Item>
      </DropdownButton>
    );
    return (
      <li className="list-group-item" key={id}>
        <div className="btn-group d-flex">
          <Button
            variant="primary"
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
    <ul className="list-group">{channels.map(generateChannelElement)}</ul>
  );
};

export default connect(mapStateToProps, actions)(ChannelList);
