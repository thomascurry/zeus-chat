/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const Message = ({ speaks, time, text }) => (
  <div>
    <div className="message">
      {speaks === 'bot' && (
        <React.Fragment>
          <span className="bot-speaks">{`${speaks} ${time}`}</span>
          <div className="text-container">
            <div className="text-background">
              <span className="text">{text}</span>
            </div>
          </div>
        </React.Fragment>
      )}
      {speaks === 'me' && (
        <React.Fragment>
          <span className="user-speaks">{`${speaks} ${time}`}</span>
          <div className="text-container user">
            <div className="text-background">
              <span className="text user">{text}</span>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  </div>
);

export default Message;
