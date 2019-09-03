import React from 'react';

function KenLeeFuncComp(props) {
	const { id, username } = props;
	console.log('id', id);

	return (
		<div>
			<h1>안녕하세요. 저는 Ken #{id} 입니다. </h1>
			<h2>{username}님 반갑습니다.</h2>
		</div>
	);
}

KenLeeFuncComp.getInitialProps = ({ query }) => {
	console.log('getInitialProps:');
	return { query, id: 10, username: '이은미' };
};

export default KenLeeFuncComp;
