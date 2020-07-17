import React from 'react';
import { connect } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';

import { selectVisibleMessages } from 'features/messages/messagesSlice';

const mapStateToProps = (state) => ({
  messages: selectVisibleMessages(state),
});

const generateMessageElement = (message) => {
  const { id, text, author } = message;
  return (
    <li className="list-group-item" key={id}>
      {author}
      {': '}
      {text}
    </li>
  );
};

class MessageList extends React.Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    scroll.scrollToBottom({ containerId: 'message-window', duration: 0 });
  };

  render() {
    const { messages } = this.props;
    return (
      <ul id="message-window" className="list-group overflow-auto">{messages.map(generateMessageElement)}</ul>
    );
  }
}

export default connect(mapStateToProps)(MessageList);
