import axios from 'axios';

import routes from 'routes';

export const addNewMessage = async (text, author, channelId) => {
  const response = await axios.post(
    routes.channelMessagesPath(channelId),
    { data: { attributes: { text, author } } },
  );
  return response.data.data.attributes;
};

export const addChannel = async (name) => {
  const response = await axios.post(
    routes.channelsPath(),
    { data: { attributes: { name } } },
  );
  return response.data.data.attributes;
};
