import React from 'react';
import { connect } from 'react-redux';
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
  constructor(props) {
    super(props);
    this.chatWindow = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const { scrollHeight } = this.chatWindow.current;
    this.chatWindow.current.scrollTop = scrollHeight;
  };

  render() {
    const { messages } = this.props;
    return (
      <ul ref={this.chatWindow} className="list-group overflow-auto">{messages.map(generateMessageElement)}</ul>
    );
  }
}

export default connect(mapStateToProps)(MessageList);
