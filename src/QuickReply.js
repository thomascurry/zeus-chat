import React from 'react';

const QuickReply = (props) => {
	if (props.reply.payload) {
		return (
			<a
				style={{
					borderRadius: 4,
					margin: 3,
					textDecoration: 'none',
					backgroundColor: '#005ea5',
					color: 'white'
				}}
				href="/"
				onClick={(event) => props.click(event, props.reply.payload, props.reply.text)}
				className="waves-effect waves-light btn-small">
				{props.reply.text}
			</a>
		);
	} else {
		return (
			<a style={{ margin: 3 }} href={props.reply.link} className="waves-effect waves-light btn-small">
				{props.reply.text}
			</a>
		);
	}
};

export default QuickReply;
