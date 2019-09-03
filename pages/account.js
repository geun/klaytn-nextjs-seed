import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useWeb3Context } from 'web3-react';

import { ethers } from 'ethers';

function getCurrentBalance(account) {
	let provider = new ethers.providers.Web3Provider(web3.currentProvider);

	return async e => {
		e.preventDefault();

		const currentBalance = await provider.getBalance(account);
		console.log('account: ', account);
		console.log('currentBalance', currentBalance.toString());
	};
}

// This component must be a child of <App> to have access to the appropriate context
function Account(props) {
	const context = useWeb3Context();
	// const [account, setAccount] = useState();

	console.log('context', context);
	// ethereum.autoRefreshOnNetworkChange = false;

	console.log('ethereum.isMetaMask', ethereum.isMetaMask);
	useEffect(() => {
		console.log('setFirstValidConnector');
		// context.setFirstValidConnector(['MetaMask', 'Infura']);
		context.setFirstValidConnector(['MetaMask']);
		// ethereum.enable().then(account => setAccount(account));
	}, []);

	console.log('check context');

	if (!context.active && !context.error) {
		// loading
		return <>Loading...</>;
	} else if (context.error) {
		//error
		return (
			<>
				<h1>error</h1>
				<pre>{JSON.stringify(context.error)}</pre>
			</>
		);
	} else {
		// success
		const { active, connectorName, account, networkId } = context;
		// console.log(ethereum.selectedAddres());
		return (
			active && (
				<>
					<h1>My account</h1>
					<p>Active Connector: {connectorName}</p>
					<p>Account: {account || 'None'}</p>
					<p>Network ID: {networkId}</p>

					<button onClick={getCurrentBalance(account)}>Get Current Balance</button>
				</>
			)
		);
	}
}

export default dynamic(() => Promise.resolve(Account), {
	ssr: false
});
