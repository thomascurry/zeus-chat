import React from 'react';
import { render } from 'react-dom';
import Zeus from './Chatbot';

function zeusChat(options) {
	// if (!options.element) {
	// 	throw new Error(`'element' to mount chatbot view has not been defined'`);
	// }
	render(<Zeus {...options} />, options.element);
}

export default zeusChat;
