/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const Message = props => (
  <div>
    <div className="message">
      {props.speaks === 'bot' && (
        <React.Fragment>
          <span className="bot-speaks">{`${props.speaks} ${props.time}`}</span>
          <div className="text-container">
            <div className="text-background">
              <span className="text" l>
                {props.text}
              </span>
            </div>
          </div>
        </React.Fragment>
      )}
      {props.speaks === 'me' && (
        <React.Fragment>
          <span className="user-speaks">{`${props.speaks} ${props.time}`}</span>

          <div
            style={{
              width: 350,
              height: 'auto',
              display: 'block',
              background: '#005ea5',
              borderRadius: 4,
              position: 'relative',
              margin: 'auto',
            }}
          >
            <p>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 11,
                  position: 'absolute',
                  bottom: 8,
                  right: 10,
                  textTransform: 'uppercase',
                  color: '#999',
                }}
              />
            </p>
            <div
              style={{
                padding: '8px 55px 8px 14px',
              }}
              className="col 10"
            >
              <span
                style={{
                  fontSize: 14,
                  margin: 0,
                  color: 'white',
                }}
              >
                {props.text}
              </span>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  </div>
);

export default Message;
