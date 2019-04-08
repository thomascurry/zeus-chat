import React from 'react';
import { render } from 'react-dom';
import Zeus from './Chatbot';

function zeusChat(domOptions) {
	const envOptions = {
		googleProjectId: process.env.GOOGLE_PROJECT_ID,
		dialogFlowSessionId: process.env.DF_SESSION_ID,
		googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
		googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY
	};

	console.table(envOptions);

	const options = Object.assign(envOptions, domOptions);

	if (!options.element) {
		throw new Error('dom element to mount chatbot view has not been defined');
	}
	render(<Zeus {...options} />, options.element);
}

export default zeusChat;
