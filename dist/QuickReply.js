'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuickReply = function QuickReply(props) {
	if (props.reply.payload) {
		return _react2.default.createElement(
			'a',
			{
				style: {
					borderRadius: 4,
					margin: 3,
					textDecoration: 'none',
					backgroundColor: '#005ea5',
					color: 'white'
				},
				href: '/',
				onClick: function onClick(event) {
					return props.click(event, props.reply.payload, props.reply.text);
				},
				className: 'waves-effect waves-light btn-small' },
			props.reply.text
		);
	} else {
		return _react2.default.createElement(
			'a',
			{ style: { margin: 3 }, href: props.reply.link, className: 'waves-effect waves-light btn-small' },
			props.reply.text
		);
	}
};

exports.default = QuickReply;