import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';

import { selectVisibleMessages } from 'features/messages/messagesSlice';

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

const MessageList = () => {
  useEffect(
    () => scroll.scrollToBottom({ containerId: 'message-window', duration: 0 }),
  );
  const messages = useSelector(selectVisibleMessages);
  return (
    <ul id="message-window" className="list-group overflow-auto">{messages.map(generateMessageElement)}</ul>
  );
};


export default MessageList;
