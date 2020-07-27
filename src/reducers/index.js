import { combineReducers } from 'redux';
import messagesReducer from 'features/messages/messagesSlice';
import channelsReducer from 'features/channels/channelsSlice';
import activeChannelReducer from 'features/activeChannel/activeChannelSlice';
import modalsReducer from 'features/modals/modalsSlice';

export default combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  currentChannelId: activeChannelReducer,
  modals: modalsReducer,
});
