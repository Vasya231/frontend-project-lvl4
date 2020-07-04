import axios from 'axios';

import routes from 'routes';

const addNewMessage = async (text, author, channelId) => {
  const response = await axios.post(
    routes.channelMessagesPath(channelId),
    { data: { attributes: { text, author } } },
  );
  return response.data.data.attributes;
};

const addChannel = async (name) => {
  const response = await axios.post(
    routes.channelsPath(),
    { data: { attributes: { name } } },
  );
  return response.data.data.attributes;
};

const deleteChannel = async (id) => {
  const response = await axios.delete(routes.channelPath(id));
  return response.data.data;
};

export default { addNewMessage, addChannel, deleteChannel };
