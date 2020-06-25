import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const selectChannelIds = (state) => (state.channels.ids);
const selectChannelStorage = (state) => (state.channels.byId);

const selectChannels = createSelector(
  [selectChannelIds, selectChannelStorage],
  (ids, byId) => ids.map((id) => byId[id]),
);

const mapStateToProps = (state) => ({
  channels: selectChannels(state),
});

const generateChannelElement = (channel) => {
  const { id, name } = channel;
  return (
    <li className="list-group-item" key={id}>{name}</li>
  );
};

const ChannelList = (props) => {
  const { channels } = props;
  return (
    <ul className="list-group col-3">{channels.map(generateChannelElement)}</ul>
  );
};

export default connect(mapStateToProps)(ChannelList);
