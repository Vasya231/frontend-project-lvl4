import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const selectActiveChannelId = (state) => state.activeChannel.id;
const selectMessageStorage = (state) => state.messages.byId;
const selectMessageIds = (state) => state.messages.ids;

const selectVisibleMessages = createSelector(
  [selectMessageIds, selectMessageStorage, selectActiveChannelId],
  (ids, byId, activeChannelId) => {
    const orderedMessages = ids.map((id) => byId[id]);
    const visibleMessages = orderedMessages
      .filter(({ channelId }) => channelId === activeChannelId);
    return visibleMessages;
  },
);

const mapStateToProps = (state) => ({
  messages: selectVisibleMessages(state),
});

const generateMessageElement = (message) => {
  const { id, text, author } = message;
  return (
    <li className="list-group-item" key={id}>
      {author}
      :
      {text}
    </li>
  );
};

const MessageList = (props) => {
  const { messages } = props;
  return (
    <ul className="list-group col">{messages.map(generateMessageElement)}</ul>
  );
};

export default connect(mapStateToProps)(MessageList);