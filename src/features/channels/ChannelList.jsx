import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import Button from 'react-bootstrap/Button';

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

  const handleDeleteChannel = (id) => () => openModal({
    type: 'deleteChannelConfirmation',
    modalProps: {
      channelId: id,
    },
  });

  const handleRenameChannel = (id) => () => openModal({
    type: 'renameChannel',
    modalProps: {
      channelId: id,
    },
  });

  const handleSwitchChannel = (id) => () => switchChannel({ id });

  const generateChannelElement = (channel) => {
    const { id, name, removable } = channel;
    return (
      <li className="list-group-item" key={id}>
        <Button
          variant="primary"
          onClick={handleSwitchChannel(id)}
          className="w-100"
        >
          {name}
        </Button>
        {removable && <Button onClick={handleDeleteChannel(id)} variant="primary">Delete icon</Button>}
        {removable && <Button onClick={handleRenameChannel(id)} variant="primary">Edit icon</Button>}
      </li>
    );
  };

  return (
    <ul className="list-group">{channels.map(generateChannelElement)}</ul>
  );
};

export default connect(mapStateToProps, actions)(ChannelList);
