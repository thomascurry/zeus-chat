/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import QuickReply from './QuickReply';

class QuickReplies extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, payload, text) {
    this.props.replyClick(event, payload, text);
  }

  renderQuickReply(reply, i) {
    return <QuickReply key={i} click={this.handleClick} reply={reply} />;
  }

  renderQuickReplies(quickReplies) {
    if (quickReplies) {
      return quickReplies.map((reply, i) => this.renderQuickReply(reply, i));
    }
    return null;
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <div
              style={{
                width: 325,
                height: 'auto',
                display: 'block',
                background: '#f0f0f0',
                borderRadius: 4,
                position: 'relative',
                margin: '40px 0px auto',
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  position: 'absolute',
                  bottom: 5,
                  right: 0,
                  color: '#999',
                  textTransform: 'capitalize',
                }}
              >
                {`${this.props.speaks} ${this.props.time}`}
              </span>
            </div>
            <div
              style={{
                width: 350,
                height: 'auto',
                display: 'block',
                background: '#f0f0f0',
                borderRadius: 4,
                position: 'relative',
                margin: 'auto',
              }}
              id="quick-replies"
            >
              <div
                style={{
                  padding: '8px 55px 8px 14px',
                }}
              >
                {this.props.text && (
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      margin: 0,
                      color: '#2b2b2b',
                    }}
                  >
                    {this.props.text}
                  </span>
                )}
                <br />
                <br />
                {this.renderQuickReplies(this.props.payload)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuickReplies;
