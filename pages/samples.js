import React from 'react';

function KenLeeFuncComp(props) {
	const { id, username } = props.query;
	console.log('id', id);
	console.log('username', id);

	return (
		<div>
			<h1>Hello. I'm Ken</h1>
			<h2>Glad to meet you {username.toLocaleUpperCase()} (ID: {id}) </h2>
		</div>
	);
}

KenLeeFuncComp.getInitialProps = ({ query }) => {
	console.log('getInitialProps:');
	return { query };
};

export default KenLeeFuncComp;
