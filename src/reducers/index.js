import { combineReducers } from 'redux';
import messagesReducer from 'features/messages/messagesSlice';
import channelsReducer from 'features/channels/channelsSlice';

export default combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
});
