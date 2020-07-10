import React from 'react';

import ChannelsWindow from 'features/channels/ChannelsWindow';
import MessageList from 'features/messages/MessageList';
import Modals from 'features/modals/Modals';
import NewMessageForm from 'features/messages/NewMessageForm';

const App = () => (
  <>
    <div className="row h-100 pb-3 d-flex flex-column flex-md-row">
      <ChannelsWindow />
      <div className="col-md-8 flex-grow-1 mh-100 d-flex flex-column flex-grow-1 justify-content-between chat-window mb-1">
        <MessageList />
        <div className="message-form">
          <NewMessageForm />
        </div>
      </div>
    </div>
    <Modals />
  </>
);

export default App;
