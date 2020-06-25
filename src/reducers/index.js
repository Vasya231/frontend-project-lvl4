import { combineReducers } from 'redux';
import messagesReducer from 'features/messages/messagesSlice';
import channelsReducer from 'features/channels/channelsSlice';
import activeChannelReducer from 'features/activeChannel/activeChannelSlice';

export default combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  activeChannel: activeChannelReducer,
});
