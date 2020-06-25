import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  channels: state.channels,
});

const generateChannelElement = (channel) => {
  const { id, name } = channel;
  return (
    <li className="list-group-item" key={id}>{name}</li>
  );
};

const ChannelList = (props) => {
  const { channels } = props;
  const { byId, ids } = channels;
  const channelList = ids.map((id) => byId[id]);
  return (
    <ul className="list-group col-3">{channelList.map(generateChannelElement)}</ul>
  );
};

export default connect(mapStateToProps)(ChannelList);
