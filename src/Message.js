import React from 'react';

const Message = (props) => (
	<div className="col s12 m8 offset-m2 offset-l3">
		<div
			style={{
				paddingTop: 30,
				paddingBottom: 10
			}}>
			{props.speaks === 'bot' && (
				<div>
					<div
						style={{
							width: 325,
							height: 'auto',
							display: 'block',
							background: '#f0f0f0',
							borderRadius: 4,
							position: 'relative',
							margin: 'auto'
						}}>
						<span
							style={{
								fontWeight: 600,
								fontSize: 14,
								position: 'absolute',
								bottom: 5,
								right: 0,
								color: '#999',
								textTransform: 'capitalize'
							}}>
							{props.speaks + ' ' + props.time}
						</span>
					</div>
					<div
						style={{
							width: 350,
							height: 'auto',
							display: 'block',
							background: '#f0f0f0',
							borderRadius: 4,
							position: 'relative',
							margin: 'auto'
						}}>
						<div
							style={{
								padding: '8px 55px 8px 14px'
							}}
							className="col 10">
							<span
								style={{
									fontWeight: 600,
									fontSize: 15,
									margin: 0,
									color: '#2b2b2b'
								}}>
								{props.text}
							</span>
						</div>
					</div>
				</div>
			)}
			{props.speaks === 'me' && (
				<div>
					<div
						style={{
							width: 325,
							height: 'auto',
							display: 'block',
							borderRadius: 4,
							position: 'relative',
							margin: 'auto'
						}}>
						<span
							style={{
								fontWeight: 600,
								fontSize: 14,
								position: 'absolute',
								bottom: 5,
								right: 0,
								color: '#999',
								textTransform: 'capitalize'
							}}>
							{props.speaks + ' ' + props.time}
						</span>
					</div>
					<div
						style={{
							width: 350,
							height: 'auto',
							display: 'block',
							background: '#005ea5',
							borderRadius: 4,
							position: 'relative',
							margin: 'auto'
						}}>
						<p>
							<span
								style={{
									fontWeight: 600,
									fontSize: 11,
									position: 'absolute',
									bottom: 8,
									right: 10,
									textTransform: 'uppercase',
									color: '#999'
								}}
							/>
						</p>
						<div
							style={{
								padding: '8px 55px 8px 14px'
							}}
							className="col 10">
							<span
								style={{
									fontSize: 14,
									margin: 0,
									color: 'white'
								}}>
								{props.text}
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	</div>
);

export default Message;
