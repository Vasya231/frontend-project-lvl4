import { connect } from 'react-redux';

import {
  addChannel, deleteChannel, renameChannel, setCurrentChannel,
} from 'features/channels/channelsSlice';
import { addMessage } from 'features/messages/messagesSlice';
import { showModal, hideModal } from 'features/modals/modalsSlice';

const actions = {
  addChannel,
  deleteChannel,
  renameChannel,
  setCurrentChannel,
  addMessage,
  showModal,
  hideModal,
};

export default (Component) => connect(null, { ...actions })(Component);
