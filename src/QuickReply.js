/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const QuickReply = (props) => {
  const { reply, click } = props;
  if (reply.payload) {
    return (
      <a
        style={{
          borderRadius: 4,
          margin: 3,
          textDecoration: 'none',
          backgroundColor: '#005ea5',
          color: 'white',
        }}
        href="/"
        onClick={event => click(event, reply.payload, reply.text)}
        className="waves-effect waves-light btn-small"
      >
        {reply.text}
      </a>
    );
  }
  return (
    <a style={{ margin: 3 }} href={reply.link} className="waves-effect waves-light btn-small">
      {reply.text}
    </a>
  );
};

export default QuickReply;
