import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          key={i}
          originator={message.originator}
          author={message.author}
          message={message.body}
        />
      );
    });

    return (
      <div className="messages message-list">
        {messages}
      </div>
    );
  }
}

export default MessageList;
