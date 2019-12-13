import React, { Component } from 'react';
import Cookies from 'js-cookie';

import { v4 as uuid } from 'uuid';
import googleAuth from 'google-oauth-jwt';
import QuickReplies from './QuickReplies';
import Message from './Message';
import './styles.scss';

class Chatbot extends Component {
  messagesEnd;

  userInput;

  constructor(props) {
    super(props);
    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.state = {
      messages: [],
      showChat: false,
      clientToken: false,
    };

    if (Cookies.get('userID') === undefined) {
      Cookies.set('userID', uuid(), {
        path: '/',
      });
    }
  }

  async getToken() {
    return new Promise((resolve) => {
      googleAuth.authenticate(
        {
          email: this.props.googleClientEmail,
          key: this.props.googlePrivateKey,
          scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        },

        (err, token) => {
          resolve(token);
        },
      );
    });
  }

  async dfTextQuery(queryText) {
    const says = {
      speaks: 'me',
      msg: {
        text: {
          text: queryText,
        },
      },
    };

    this.setState({
      messages: [...this.state.messages, says],
    });

    const request = {
      queryInput: {
        text: {
          text: queryText,
          languageCode: 'en-US',
        },
      },
    };

    await this.df_client_call(request);
  }

  async dfEventQuery(eventName) {
    const request = {
      queryInput: {
        event: {
          name: eventName,
          languageCode: 'en-US',
        },
      },
    };

    await this.df_client_call(request);
  }

  async df_client_call(requestBody) {
    if (this.state.clientToken === false) {
      const token = await this.getToken();
      this.setState({ clientToken: token });
    }

    const res = await fetch(
      `https://dialogflow.googleapis.com/v2/projects/${this.props.googleProjectId}/agent/sessions/${
        this.props.dialogFlowSessionId
      }${Cookies.get('userID')}:detectIntent`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.state.clientToken}`,
          'Content-Type': 'application/json; charset=utf-8',
        },

        body: JSON.stringify(requestBody),
      },
    ).then(data => data.json());

    let says = {};

    for (const msg of res.queryResult.fulfillmentMessages) {
      says = {
        speaks: 'bot',
        msg,
      };

      this.setState({
        messages: [...this.state.messages, says],
      });
    }
  }

  componentDidMount() {
    this.dfEventQuery('Welcome');
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({
      behaviour: 'smooth',
    });

    if (this.userInput) {
      this.userInput.focus();
    }
  }

  show(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      showChat: true,
    });
  }

  hide(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      showChat: false,
    });
  }

  renderOneMessage(message, i) {
    console.log(message);

    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message
          key={i}
          speaks={message.speaks}
          text={message.msg.text.text}
          time={new Date().toLocaleTimeString()}
        />
      );
    }

    if (message.msg && message.msg.payload && message.msg.payload.quick_replies) {
      return (
        <QuickReplies
          text={message.msg.payload.text ? message.msg.payload.text : null}
          key={i}
          replyClick={this._handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.quick_replies}
          time={new Date().toLocaleTimeString()}
        />
      );
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => this.renderOneMessage(message, i));
    }

    return null;
  }

  _handleInputKeyPress(event) {
    if (event.key === 'Enter') {
      this.dfTextQuery(event.target.value);
      event.target.value = '';
    }
  }

  _handleQuickReplyPayload(event, payload, text) {
    event.preventDefault();
    event.stopPropagation();

    switch (payload) {
      case 'selected_alcohol':
        this.dfEventQuery('DECLARE_ALCOHOL');
        break;
      case 'selected_tobacco':
        this.dfEventQuery('DECLARE_TOBACCO');
        break;
      case 'selected_other':
        this.dfEventQuery('DECLARE_OTHER');
        break;
      default:
        this.dfTextQuery(text);
        break;
    }
  }

  render() {
    if (this.state.showChat) {
      return (
        <div className="chatbot">
          <div className="title-bar">
            <h1 className="title">Virtual Assistant</h1>

            <a href="/" onClick={this.hide} className="close">
              Close
            </a>
          </div>
          <div className="chat-container">
            <div className="chat-body">
              {this.renderMessages(this.state.messages)}
              <div
                ref={(elem) => {
                  this.messagesEnd = elem;
                }}
              />
            </div>
            <br />
            <div style={{ width: '100%' }}>
              <input
                className="chat-input"
                style={{ height: 30, background: 'white' }}
                ref={input => (this.userInput = input)}
                type="text"
                onKeyPress={this._handleInputKeyPress}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className="chatbot"
        style={{
          background: 'transparent',
          height: 400,
          width: 400,
          position: 'relative',
          float: 'right',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            height: 50,
            width: 250,
            margin: '0px auto',
            backgroundColor: '#005ea5',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            textAlign: 'center',
            boxShadow: '-1px 1px 5px -2px rgba(0,0,0,0.38)',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              marginTop: '10px',
            }}
          >
            <a
              href="/"
              onClick={this.show}
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: 20,
              }}
            >
              Ask for help
            </a>
          </span>
        </div>

        <div
          style={{
            float: 'left',
            clear: 'both',
          }}
          ref={(elem) => {
            this.messagesEnd = elem;
          }}
        />
      </div>
    );
  }
}

export default Chatbot;
