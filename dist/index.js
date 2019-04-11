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

function zeusChat(domOptions) {
  var envOptions = {
    googleProjectId: process.env.GOOGLE_PROJECT_ID,
    dialogFlowSessionId: process.env.DF_SESSION_ID,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY
  };

  var options = Object.assign(envOptions, domOptions);

  if (!options.element) {
    throw new Error('dom element to mount chatbot view has not been defined');
  }
  if (!options.googleProjectId) {
    throw new Error('please set the GOOGLE_PROJECT_ID environment variable');
  }
  if (!options.dialogFlowSessionId) {
    throw new Error('please set the DF_SESSION_ID environment variable');
  }
  if (!options.googleClientEmail) {
    throw new Error('please set the GOOGLE_CLIENT_EMAIL environment variable');
  }
  if (!options.googlePrivateKey) {
    throw new Error('please set the GOOGLE_PRIVATE_KEY environment variable');
  }
  (0, _reactDom.render)(_react2.default.createElement(_Chatbot2.default, options), options.element);
} /* eslint-disable react/jsx-filename-extension */
exports.default = zeusChat;