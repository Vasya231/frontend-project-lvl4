import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import Button from 'react-bootstrap/Button';

import { setActiveChannel } from 'features/activeChannel/activeChannelSlice';
import serverAPI from 'serverAPI';

const selectChannelIds = (state) => (state.channels.ids);
const selectChannelStorage = (state) => (state.channels.byId);

const selectChannels = createSelector(
  [selectChannelIds, selectChannelStorage],
  (ids, byId) => ids.map((id) => byId[id]),
);

const mapStateToProps = (state) => ({
  channels: selectChannels(state),
  activeChannel: state.activeChannel.id,
});

const actions = {
  switchChannel: setActiveChannel,
};

const ChannelList = (props) => {
  const { channels, switchChannel, activeChannel } = props;

  const handleDeleteChannel = (id) => async () => {
    await serverAPI.deleteChannel(id);
    if (id === activeChannel) {
      switchChannel({ id: 1 });
    }
  };

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
        {removable && <Button onClick={handleDeleteChannel(id)} variant="primary">X</Button>}
      </li>
    );
  };

  return (
    <ul className="list-group">{channels.map(generateChannelElement)}</ul>
  );
};

export default connect(mapStateToProps, actions)(ChannelList);
