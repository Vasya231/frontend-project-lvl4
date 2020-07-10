import { useState, useEffect } from 'react';
import _ from 'lodash';

const buildInitialState = (gon) => {
  const { channels, messages, currentChannelId } = gon;
  const channelsById = _.keyBy(channels, 'id');
  const messagesById = _.keyBy(messages, 'id');
  const channelIds = channels.map((c) => c.id);
  const messageIds = messages.map((m) => m.id);
  return {
    activeChannel: {
      id: currentChannelId,
    },
    entities: {
      channels: {
        byId: channelsById,
        ids: channelIds,
      },
      messages: {
        byId: messagesById,
        ids: messageIds,
      },
    },
  };
};

const getWindowDimensions = () => {
  const { innerHeight: height, innerWidth: width } = window;
  return { height, width };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const resizeHandler = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  });

  return windowDimensions;
};

export const validateChannelName = ({ channelName }) => {
  if (!String(channelName).trim()) {
    return { channelName: 'Required' };
  }
  return {};
};

export const validateMessageText = ({ text }) => {
  if (!text) {
    return { text: 'Required' };
  }
  return {};
};

export { buildInitialState, useWindowDimensions };
