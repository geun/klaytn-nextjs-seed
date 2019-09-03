import React, { useEffect } from 'react';
import { useWeb3Context } from 'web3-react';

// This component must be a child of <App> to have access to the appropriate context
function Account() {
	const context = useWeb3Context();

	useEffect(() => {
		context.setFirstValidConnector(['MetaMask', 'Infura']);
	}, []);

	if (!context.active && !context.error) {
		// loading
		return <div>로딩중</div>;
	} else if (context.error) {
		//error
		return (
			<div>
				에러가 발생하였습니다.
				<pre>{Json.stringify(context.error)}</pre>
			</div>
		);
	} else {
		// success
		return (
			<div>
				<h1>My Account</h1>
				{JSON.stringify(context.account, null, 4)}
			</div>
		);
	}
}

export default Account;
