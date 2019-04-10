'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuickReply = function QuickReply(props) {
  var reply = props.reply,
      click = props.click;

  if (reply.payload) {
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
          return click(event, reply.payload, reply.text);
        },
        className: 'waves-effect waves-light btn-small'
      },
      reply.text
    );
  }
  return _react2.default.createElement(
    'a',
    { style: { margin: 3 }, href: reply.link, className: 'waves-effect waves-light btn-small' },
    reply.text
  );
}; /* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
exports.default = QuickReply;