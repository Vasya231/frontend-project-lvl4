import { useState, useEffect } from 'react';
import { normalize, schema } from 'normalizr';

import { channelNameMaxLength } from 'constants';

const itemSchema = new schema.Entity('items');
const itemListSchema = new schema.Array(itemSchema);

export const normalizeItems = (itemList) => {
  const normalizedList = normalize(itemList, itemListSchema);
  return {
    byId: normalizedList.entities.items || {},
    ids: normalizedList.result,
  };
};

export const buildInitialState = (gon) => {
  const { channels, messages, currentChannelId } = gon;
  return {
    activeChannel: {
      id: currentChannelId,
    },
    entities: {
      channels: normalizeItems(channels),
      messages: normalizeItems(messages),
    },
  };
};

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
