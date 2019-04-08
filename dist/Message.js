'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = function Message(props) {
	return _react2.default.createElement(
		'div',
		{ className: 'col s12 m8 offset-m2 offset-l3' },
		_react2.default.createElement(
			'div',
			{
				style: {
					paddingTop: 30,
					paddingBottom: 10
				} },
			props.speaks === 'bot' && _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{
						style: {
							width: 325,
							height: 'auto',
							display: 'block',
							background: '#f0f0f0',
							borderRadius: 4,
							position: 'relative',
							margin: 'auto'
						} },
					_react2.default.createElement(
						'span',
						{
							style: {
								fontWeight: 600,
								fontSize: 14,
								position: 'absolute',
								bottom: 5,
								right: 0,
								color: '#999',
								textTransform: 'capitalize'
							} },
						props.speaks + ' ' + props.time
					)
				),
				_react2.default.createElement(
					'div',
					{
						style: {
							width: 350,
							height: 'auto',
							display: 'block',
							background: '#f0f0f0',
							borderRadius: 4,
							position: 'relative',
							margin: 'auto'
						} },
					_react2.default.createElement(
						'div',
						{
							style: {
								padding: '8px 55px 8px 14px'
							},
							className: 'col 10' },
						_react2.default.createElement(
							'span',
							{
								style: {
									fontWeight: 600,
									fontSize: 15,
									margin: 0,
									color: '#2b2b2b'
								} },
							props.text
						)
					)
				)
			),
			props.speaks === 'me' && _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{
						style: {
							width: 325,
							height: 'auto',
							display: 'block',
							borderRadius: 4,
							position: 'relative',
							margin: 'auto'
						} },
					_react2.default.createElement(
						'span',
						{
							style: {
								fontWeight: 600,
								fontSize: 14,
								position: 'absolute',
								bottom: 5,
								right: 0,
								color: '#999',
								textTransform: 'capitalize'
							} },
						props.speaks + ' ' + props.time
					)
				),
				_react2.default.createElement(
					'div',
					{
						style: {
							width: 350,
							height: 'auto',
							display: 'block',
							background: '#005ea5',
							borderRadius: 4,
							position: 'relative',
							margin: 'auto'
						} },
					_react2.default.createElement(
						'p',
						null,
						_react2.default.createElement('span', {
							style: {
								fontWeight: 600,
								fontSize: 11,
								position: 'absolute',
								bottom: 8,
								right: 10,
								textTransform: 'uppercase',
								color: '#999'
							}
						})
					),
					_react2.default.createElement(
						'div',
						{
							style: {
								padding: '8px 55px 8px 14px'
							},
							className: 'col 10' },
						_react2.default.createElement(
							'span',
							{
								style: {
									fontSize: 14,
									margin: 0,
									color: 'white'
								} },
							props.text
						)
					)
				)
			)
		)
	);
};

exports.default = Message;