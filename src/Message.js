import React from 'react'

const Message = (props) => {
  return (
    <div className={'message ' + props.originator}>
      <div className="author">
        {props.author}
      </div>
      <div className="message-body">
        {props.message}
      </div>
    </div>
  );
};

export default Message;
