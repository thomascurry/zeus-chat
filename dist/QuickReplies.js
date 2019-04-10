'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _QuickReply = require('./QuickReply');

var _QuickReply2 = _interopRequireDefault(_QuickReply);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
var QuickReplies = function (_Component) {
  (0, _inherits3.default)(QuickReplies, _Component);

  function QuickReplies(props) {
    (0, _classCallCheck3.default)(this, QuickReplies);

    var _this = (0, _possibleConstructorReturn3.default)(this, (QuickReplies.__proto__ || Object.getPrototypeOf(QuickReplies)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(QuickReplies, [{
    key: 'handleClick',
    value: function handleClick(event, payload, text) {
      this.props.replyClick(event, payload, text);
    }
  }, {
    key: 'renderQuickReply',
    value: function renderQuickReply(reply, i) {
      return _react2.default.createElement(_QuickReply2.default, { key: i, click: this.handleClick, reply: reply });
    }
  }, {
    key: 'renderQuickReplies',
    value: function renderQuickReplies(quickReplies) {
      var _this2 = this;

      if (quickReplies) {
        return quickReplies.map(function (reply, i) {
          return _this2.renderQuickReply(reply, i);
        });
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
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
                  margin: '40px 0px auto'
                }
              },
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
                  }
                },
                this.props.speaks + ' ' + this.props.time
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
                },
                id: 'quick-replies'
              },
              _react2.default.createElement(
                'div',
                {
                  style: {
                    padding: '8px 55px 8px 14px'
                  }
                },
                this.props.text && _react2.default.createElement(
                  'span',
                  {
                    style: {
                      fontWeight: 600,
                      fontSize: 15,
                      margin: 0,
                      color: '#2b2b2b'
                    }
                  },
                  this.props.text
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                this.renderQuickReplies(this.props.payload)
              )
            )
          )
        )
      );
    }
  }]);
  return QuickReplies;
}(_react.Component);

exports.default = QuickReplies;