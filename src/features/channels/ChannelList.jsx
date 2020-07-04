import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import Button from 'react-bootstrap/Button';

import { setActiveChannel } from 'features/activeChannel/activeChannelSlice';

const selectChannelIds = (state) => (state.channels.ids);
const selectChannelStorage = (state) => (state.channels.byId);

const selectChannels = createSelector(
  [selectChannelIds, selectChannelStorage],
  (ids, byId) => ids.map((id) => byId[id]),
);

const mapStateToProps = (state) => ({
  channels: selectChannels(state),
});

const actionCreators = {
  switchChannel: setActiveChannel,
};

const ChannelList = (props) => {
  const { channels, switchChannel } = props;
  const generateChannelElement = (channel) => {
    const { id, name } = channel;
    return (
      <li className="list-group-item" key={id}>
        <Button
          variant="primary"
          onClick={() => switchChannel({ id })}
          className="w-100"
        >
          {name}
        </Button>
      </li>
    );
  };
  return (
    <ul className="list-group">{channels.map(generateChannelElement)}</ul>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelList);
