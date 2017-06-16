import React from 'react';
import renderHTML from 'react-render-html';

const Message = (props) => {
  return (
    <div className={'message ' + props.originator}>
      <div className="author">
        {props.author}
      </div>
      <div className="message-body">
          {renderHTML(props.message)}
      </div>
    </div>
  );
};

export default Message;
