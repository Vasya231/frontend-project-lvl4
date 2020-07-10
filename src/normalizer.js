import { normalize, schema } from 'normalizr';

const message = new schema.Entity('message');
const messages = new schema.Array(message);

const channel = new schema.Entity('channel');
const channels = new schema.Array(channel);

const gon = new schema.Object({ channels, messages });

export default (data) => {
  const normalizedData = normalize(data, gon);
  return ({
    channels: {
      byId: normalizedData.entities.channel,
      ids: normalizedData.result.channels,
    },
    messages: {
      byId: normalizedData.entities.message,
      ids: normalizedData.result.messages,
    },
    activeChannel: {
      id: normalizedData.result.currentChannelId,
    },
  });
};
