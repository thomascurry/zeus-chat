'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _uuid = require('uuid');

var _QuickReplies = require('./QuickReplies');

var _QuickReplies2 = _interopRequireDefault(_QuickReplies);

var _Message = require('./Message');

var _Message2 = _interopRequireDefault(_Message);

var _googleOauthJwt = require('google-oauth-jwt');

var _googleOauthJwt2 = _interopRequireDefault(_googleOauthJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var Chatbot = function (_Component) {
	(0, _inherits3.default)(Chatbot, _Component);

	function Chatbot(props) {
		(0, _classCallCheck3.default)(this, Chatbot);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Chatbot.__proto__ || Object.getPrototypeOf(Chatbot)).call(this, props));

		_this._handleInputKeyPress = _this._handleInputKeyPress.bind(_this);
		_this._handleQuickReplyPayload = _this._handleQuickReplyPayload.bind(_this);

		_this.show = _this.show.bind(_this);
		_this.hide = _this.hide.bind(_this);
		_this.state = {
			messages: [],
			showChat: true,
			clientToken: false
		};

		if (_jsCookie2.default.get('userID') === undefined) {
			_jsCookie2.default.set('userID', (0, _uuid.v4)(), {
				path: '/'
			});
		}
		return _this;
	}

	(0, _createClass3.default)(Chatbot, [{
		key: 'getToken',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								return _context.abrupt('return', new Promise(function (resolve) {
									_googleOauthJwt2.default.authenticate({
										email: process.env.REACT_APP_GOOGLE_CLIENT_EMAIL,
										key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY,
										scopes: ['https://www.googleapis.com/auth/cloud-platform']
									}, function (err, token) {
										resolve(token);
									});
								}));

							case 1:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getToken() {
				return _ref.apply(this, arguments);
			}

			return getToken;
		}()
	}, {
		key: 'df_text_query',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryText) {
				var says, request;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								says = {
									speaks: 'me',
									msg: {
										text: {
											text: queryText
										}
									}
								};


								this.setState({
									messages: [].concat((0, _toConsumableArray3.default)(this.state.messages), [says])
								});

								request = {
									queryInput: {
										text: {
											text: queryText,
											languageCode: 'en-US'
										}
									}
								};
								_context2.next = 5;
								return this.df_client_call(request);

							case 5:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function df_text_query(_x) {
				return _ref2.apply(this, arguments);
			}

			return df_text_query;
		}()
	}, {
		key: 'df_event_query',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(eventName) {
				var request;
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								request = {
									queryInput: {
										event: {
											name: eventName,
											languageCode: 'en-US'
										}
									}
								};
								_context3.next = 3;
								return this.df_client_call(request);

							case 3:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function df_event_query(_x2) {
				return _ref3.apply(this, arguments);
			}

			return df_event_query;
		}()
	}, {
		key: 'df_client_call',
		value: function () {
			var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(requestBody) {
				var token, res, says, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, msg;

				return _regenerator2.default.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								if (!(this.state.clientToken === false)) {
									_context4.next = 5;
									break;
								}

								_context4.next = 3;
								return this.getToken();

							case 3:
								token = _context4.sent;

								this.setState({ clientToken: token });

							case 5:
								_context4.next = 7;
								return fetch('https://dialogflow.googleapis.com/v2/projects/' + process.env.REACT_APP_GOOGLE_PROJECT_ID + '/agent/sessions/' + process.env.REACT_APP_DF_SESSION_ID + _jsCookie2.default.get('userID') + ':detectIntent', {
									method: 'POST',
									headers: {
										Accept: 'application/json',
										Authorization: 'Bearer ' + this.state.clientToken,
										'Content-Type': 'application/json; charset=utf-8'
									},
									body: JSON.stringify(requestBody)
								}).then(function (data) {
									return data.json();
								});

							case 7:
								res = _context4.sent;
								says = {};
								_iteratorNormalCompletion = true;
								_didIteratorError = false;
								_iteratorError = undefined;
								_context4.prev = 12;


								for (_iterator = res.queryResult.fulfillmentMessages[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									msg = _step.value;

									says = {
										speaks: 'bot',
										msg: msg
									};

									this.setState({
										messages: [].concat((0, _toConsumableArray3.default)(this.state.messages), [says])
									});
								}
								_context4.next = 20;
								break;

							case 16:
								_context4.prev = 16;
								_context4.t0 = _context4['catch'](12);
								_didIteratorError = true;
								_iteratorError = _context4.t0;

							case 20:
								_context4.prev = 20;
								_context4.prev = 21;

								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}

							case 23:
								_context4.prev = 23;

								if (!_didIteratorError) {
									_context4.next = 26;
									break;
								}

								throw _iteratorError;

							case 26:
								return _context4.finish(23);

							case 27:
								return _context4.finish(20);

							case 28:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this, [[12, 16, 20, 28], [21,, 23, 27]]);
			}));

			function df_client_call(_x3) {
				return _ref4.apply(this, arguments);
			}

			return df_client_call;
		}()
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.df_event_query('Welcome');
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.messagesEnd.scrollIntoView({
				behaviour: 'smooth'
			});

			if (this.userInput) {
				this.userInput.focus();
			}
		}
	}, {
		key: 'show',
		value: function show(event) {
			event.preventDefault();
			event.stopPropagation();

			this.setState({ showChat: true });
		}
	}, {
		key: 'hide',
		value: function hide(event) {
			event.preventDefault();
			event.stopPropagation();

			this.setState({ showChat: false });
		}
	}, {
		key: 'renderOneMessage',
		value: function renderOneMessage(message, i) {
			console.log(message);
			if (message.msg && message.msg.text && message.msg.text.text) {
				return _react2.default.createElement(_Message2.default, {
					key: i,
					speaks: message.speaks,
					text: message.msg.text.text,
					time: new Date().toLocaleTimeString()
				});
			} else if (message.msg && message.msg.payload && message.msg.payload.quick_replies) {
				return _react2.default.createElement(_QuickReplies2.default, {
					text: message.msg.payload.text ? message.msg.payload.text : null,
					key: i,
					replyClick: this._handleQuickReplyPayload,
					speaks: message.speaks,
					payload: message.msg.payload.quick_replies,
					time: new Date().toLocaleTimeString()
				});
			}
		}
	}, {
		key: 'renderMessages',
		value: function renderMessages(stateMessages) {
			var _this2 = this;

			if (stateMessages) {
				return stateMessages.map(function (message, i) {
					return _this2.renderOneMessage(message, i);
				});
			} else {
				return null;
			}
		}
	}, {
		key: '_handleInputKeyPress',
		value: function _handleInputKeyPress(event) {
			if (event.key === 'Enter') {
				this.df_text_query(event.target.value);
				event.target.value = '';
			}
		}
	}, {
		key: '_handleQuickReplyPayload',
		value: function _handleQuickReplyPayload(event, payload, text) {
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
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			if (this.state.showChat) {
				return _react2.default.createElement(
					'div',
					{
						className: 'Chatbot',
						style: {
							height: 400,
							width: 400,
							float: 'right'
						} },
					_react2.default.createElement(
						'div',
						{
							style: {
								height: 50,
								verticalAlign: 'center',
								backgroundColor: '#005ea5',
								borderBottomColor: 'black',
								borderBottomWidth: 1,
								boxShadow: '-1px 1px 5px -2px rgba(0,0,0,0.38)'
							} },
						_react2.default.createElement(
							'h1',
							{
								style: {
									margin: '10px 0px 10px 10px',
									display: 'inline-block',
									fontSize: 25,
									color: 'white'
								} },
							'Virtual Assistant'
						),
						_react2.default.createElement(
							'a',
							{ href: '/', onClick: this.hide, style: { color: 'white', fontSize: 20, marginLeft: '150px' } },
							'Close'
						)
					),
					_react2.default.createElement(
						'div',
						{
							id: 'chatbot',
							style: {
								height: '100%',
								width: '100%',
								overflow: 'auto',
								boxShadow: '-1px 1px 5px -2px rgba(0,0,0,0.38)'
							} },
						this.renderMessages(this.state.messages),
						_react2.default.createElement('div', {
							style: {
								float: 'left',
								clear: 'both'
							},
							ref: function ref(elem) {
								_this3.messagesEnd = elem;
							}
						})
					),
					_react2.default.createElement('br', null),
					_react2.default.createElement('input', {
						style: { width: '100%' },
						ref: function ref(input) {
							return _this3.userInput = input;
						},
						type: 'text',
						onKeyPress: this._handleInputKeyPress
					})
				);
			} else {
				return _react2.default.createElement(
					'div',
					{
						style: {
							height: 400,
							width: 400,
							position: 'relative',
							float: 'right'
						} },
					_react2.default.createElement(
						'div',
						{
							style: {
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
							} },
						_react2.default.createElement(
							'span',
							{ style: { display: 'inline-block', marginTop: '10px' } },
							_react2.default.createElement(
								'a',
								{
									href: '/',
									onClick: this.show,
									style: {
										textDecoration: 'none',
										color: 'white',
										fontSize: 20
									} },
								'Ask for help'
							)
						)
					),
					_react2.default.createElement('div', {
						style: {
							float: 'left',
							clear: 'both'
						},
						ref: function ref(elem) {
							_this3.messagesEnd = elem;
						}
					})
				);
			}
		}
	}]);
	return Chatbot;
}(_react.Component);

exports.default = Chatbot;