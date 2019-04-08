'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Chatbot = require('./Chatbot');

var _Chatbot2 = _interopRequireDefault(_Chatbot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function zeusChat(options) {
	// if (!options.element) {
	// 	throw new Error(`'element' to mount chatbot view has not been defined'`);
	// }
	(0, _reactDom.render)(_react2.default.createElement(_Chatbot2.default, null), options.element);
}

exports.default = zeusChat;