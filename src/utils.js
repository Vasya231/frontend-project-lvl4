import { useState, useEffect } from 'react';
import { normalize, schema } from 'normalizr';

const itemSchema = new schema.Entity('items');
const itemListSchema = new schema.Array(itemSchema);

export const normalizeItems = (itemList) => {
  const normalizedList = normalize(itemList, itemListSchema);
  return {
    byId: normalizedList.entities.items,
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
  if (!String(channelName).trim()) {
    return { channelName: 'Required' };
  }
  return {};
};

export const validateMessageText = ({ text }) => {
  if (!String(text).trim()) {
    return { text: 'Required' };
  }
  return {};
};
