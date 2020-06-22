import _ from 'lodash';

const buildInitialState = (gon) => {
  const { channels, messages, currentChannelId } = gon;
  const channelsById = _.keyBy(channels, 'id');
  const messagesById = _.keyBy(messages, 'id');
  const channelIds = channels.map((c) => c.id);
  const messageIds = messages.map((m) => m.id);
  return {
    currentChannelId,
    channels: {
      byId: channelsById,
      ids: channelIds,
    },
    messages: {
      byId: messagesById,
      ids: messageIds,
    },
  };
};

const somethingElse = () => {};

export { buildInitialState, somethingElse };
