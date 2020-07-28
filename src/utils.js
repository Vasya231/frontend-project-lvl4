import { useState, useEffect } from 'react';

import { channelNameMaxLength } from 'constants';

import { object, string } from 'yup';

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

export const channelNameSchema = object().shape({
  channelName: string().transform((value) => value.trim()).max(channelNameMaxLength).required(),
});

export const messageTextSchema = object().shape({
  text: string().transform((value) => value.trim()).required(),
});
