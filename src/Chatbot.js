import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';
import QuickReplies from './QuickReplies';
import Message from './Message';
import googleAuth from 'google-oauth-jwt';

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
			showChat: true,
			clientToken: false
		};

		if (Cookies.get('userID') === undefined) {
			Cookies.set('userID', uuid(), {
				path: '/'
			});
		}
	}

	async getToken() {
		return new Promise((resolve) => {
			googleAuth.authenticate(
				{
					email: this.props.googleClientEmail,
					key: this.props.googlePrivateKey,
					scopes: [ 'https://www.googleapis.com/auth/cloud-platform' ]
				},
				(err, token) => {
					resolve(token);
				}
			);
		});
	}

	async df_text_query(queryText) {
		let says = {
			speaks: 'me',
			msg: {
				text: {
					text: queryText
				}
			}
		};

		this.setState({
			messages: [ ...this.state.messages, says ]
		});

		const request = {
			queryInput: {
				text: {
					text: queryText,
					languageCode: 'en-US'
				}
			}
		};

		await this.df_client_call(request);
	}

	async df_event_query(eventName) {
		const request = {
			queryInput: {
				event: {
					name: eventName,
					languageCode: 'en-US'
				}
			}
		};

		await this.df_client_call(request);
	}

	async df_client_call(requestBody) {
		if (this.state.clientToken === false) {
			const token = await this.getToken();
			this.setState({ clientToken: token });
		}

		const res = await fetch(
			'https://dialogflow.googleapis.com/v2/projects/' +
				this.props.googleProjectId +
				'/agent/sessions/' +
				this.props.dialogFlowSessionId +
				Cookies.get('userID') +
				':detectIntent',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + this.state.clientToken,
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify(requestBody)
			}
		).then((data) => data.json());

		let says = {};

		for (let msg of res.queryResult.fulfillmentMessages) {
			says = {
				speaks: 'bot',
				msg
			};

			this.setState({
				messages: [ ...this.state.messages, says ]
			});
		}
	}

	componentDidMount() {
		this.df_event_query('Welcome');
	}

	componentDidUpdate() {
		this.messagesEnd.scrollIntoView({
			behaviour: 'smooth'
		});

		if (this.userInput) {
			this.userInput.focus();
		}
	}

	show(event) {
		event.preventDefault();
		event.stopPropagation();

		this.setState({ showChat: true });
	}

	hide(event) {
		event.preventDefault();
		event.stopPropagation();

		this.setState({ showChat: false });
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
		} else if (message.msg && message.msg.payload && message.msg.payload.quick_replies) {
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
			return stateMessages.map((message, i) => {
				return this.renderOneMessage(message, i);
			});
		} else {
			return null;
		}
	}

	_handleInputKeyPress(event) {
		if (event.key === 'Enter') {
			this.df_text_query(event.target.value);
			event.target.value = '';
		}
	}

	_handleQuickReplyPayload(event, payload, text) {
		event.preventDefault();
		event.stopPropagation();

		switch (payload) {
			case 'selected_alcohol':
				this.df_event_query('DECLARE_ALCOHOL');
				break;
			case 'selected_tobacco':
				this.df_event_query('DECLARE_TOBACCO');
				break;
			case 'selected_other':
				this.df_event_query('DECLARE_OTHER');
				break;
			default:
				this.df_text_query(text);
				break;
		}
	}

	render() {
		if (this.state.showChat) {
			return (
				<div
					className="Chatbot"
					style={{
						height: 400,
						width: 400,
						float: 'right'
					}}>
					<div
						style={{
							height: 50,
							verticalAlign: 'center',
							backgroundColor: '#005ea5',
							borderBottomColor: 'black',
							borderBottomWidth: 1,
							boxShadow: '-1px 1px 5px -2px rgba(0,0,0,0.38)'
						}}>
						<h1
							style={{
								margin: '10px 0px 10px 10px',
								display: 'inline-block',
								fontSize: 25,
								color: 'white'
							}}>
							Virtual Assistant
						</h1>
						<a href="/" onClick={this.hide} style={{ color: 'white', fontSize: 20, marginLeft: '150px' }}>
							Close
						</a>
					</div>
					<div
						id="chatbot"
						style={{
							height: '100%',
							width: '100%',
							overflow: 'auto',
							boxShadow: '-1px 1px 5px -2px rgba(0,0,0,0.38)'
						}}>
						{this.renderMessages(this.state.messages)}
						<div
							style={{
								float: 'left',
								clear: 'both'
							}}
							ref={(elem) => {
								this.messagesEnd = elem;
							}}
						/>
					</div>
					<br />
					<input
						style={{ width: '100%' }}
						ref={(input) => (this.userInput = input)}
						type="text"
						onKeyPress={this._handleInputKeyPress}
					/>
				</div>
			);
		} else {
			return (
				<div
					style={{
						height: 400,
						width: 400,
						position: 'relative',
						float: 'right'
					}}>
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
							boxShadow: '-1px 1px 5px -2px rgba(0,0,0,0.38)'
						}}>
						<span style={{ display: 'inline-block', marginTop: '10px' }}>
							<a
								href="/"
								onClick={this.show}
								style={{
									textDecoration: 'none',
									color: 'white',
									fontSize: 20
								}}>
								Ask for help
							</a>
						</span>
					</div>
					<div
						style={{
							float: 'left',
							clear: 'both'
						}}
						ref={(elem) => {
							this.messagesEnd = elem;
						}}
					/>
				</div>
			);
		}
	}
}

export default Chatbot;
