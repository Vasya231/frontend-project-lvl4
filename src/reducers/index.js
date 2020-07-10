import { combineReducers } from 'redux';
import messagesReducer from 'features/messages/messagesSlice';
import channelsReducer from 'features/channels/channelsSlice';
import activeChannelReducer from 'features/activeChannel/activeChannelSlice';
import modalsReducer from 'features/modals/modalsSlice';

const entitiesReducer = combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
});

export default combineReducers({
  entities: entitiesReducer,
  activeChannel: activeChannelReducer,
  modals: modalsReducer,
});
