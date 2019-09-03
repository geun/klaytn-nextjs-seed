import React from 'react';

function KenLeeFuncComp(props) {
	const { id, username } = props.query;
	console.log('id', id);
	console.log('username', id);

	return (
		<>
			<h1 style={{marginTop: 24}}>Hello. I'm Ken</h1>
			<h2 style={{color: "#6a6a6a"}}>Glad to meet you {username.toLocaleUpperCase()} (ID: {id}) </h2>
		</>
	);
}

KenLeeFuncComp.getInitialProps = ({ query }) => {
	console.log('getInitialProps:');
	return { query };
};

export default KenLeeFuncComp;
