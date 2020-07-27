import { useState, useEffect } from 'react';

import { channelNameMaxLength } from 'constants';

export const buildInitialState = ({ messages, channels: channelList, currentChannelId }) => ({
  messages,
  channels: {
    currentChannelId,
    channelList,
  },
});

const getWindowDimensions = () => {
  const { innerHeight: height, innerWidth: width } = window;
  return { height, width };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const resizeHandler = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  });

  return windowDimensions;
};

export const validateChannelName = ({ channelName }) => {
  const normalizedChannelName = channelName.trim();
  if (!normalizedChannelName) {
    return { channelName: 'Required' };
  }
  if (normalizedChannelName.length > channelNameMaxLength) {
    return { channelName: 'Too long' };
  }
  return {};
};

export const validateMessageText = ({ text }) => {
  if (!text.trim()) {
    return { text: 'Required' };
  }
  return {};
};
