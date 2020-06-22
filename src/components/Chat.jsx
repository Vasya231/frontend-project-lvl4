import React from 'react';
import ChannelList from './ChannelList';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { channels } = this.props;
    return (
      <>
        <div>hello</div>
        <ChannelList channels={channels} />
      </>
    );
  }
}

export default Chat;
