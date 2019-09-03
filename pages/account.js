import React, { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import { useWeb3Context } from 'web3-react';

import { ethers } from 'ethers';

const setCurrentHandle = (context, setHandler) => e => {
	e.preventDefault();
	return updateBalance(context, setHandler);
};

const updateBalance = async (context, setCurrentBalance) => {
	if (!context.active) return;
	const { account, library } = context;
	const current = await library.getBalance(account);
	setCurrentBalance(current.toString());
};

const initialEther = ethers.utils.parseEther('0');
// This component must be a child of <App> to have access to the appropriate context
function Account(props) {

	// const ethereum = {};
	if (ethereum && !!ethereum.autoRefreshOnNetworkChange) {
		console.log('autoRefreshOnNetworkChange');
		ethereum.autoRefreshOnNetworkChange = false;
	}

	const context = useWeb3Context();
	const mountedRef = useRef(false);

	useEffect(() => {
		mountedRef.current = true;
		return () => (mountedRef.current = false);
	});

	// const manager = useWeb3Manager();
	const [currentBalance, setCurrentBalance] = useState(initialEther);

	const safeSetCurrentBalance = (...args) => mountedRef.current && setCurrentBalance(...args);

	useEffect(() => {
		console.log('context changed', context);
		updateBalance(context, safeSetCurrentBalance);
	}, [context]);

	useEffect(() => {
		console.log('setFirstValidConnector');
		// context.setFirstValidConnector(['MetaMask', 'Infura']);
		context.setFirstValidConnector(['MetaMask']);
	}, []);

	if (!context.active && !context.error) {
		// loading
		return <>Loading...</>;
	} else if (context.error) {
		//error
		return (
			<>
				<h1>Error</h1>
				<pre>{JSON.stringify(context.error)}</pre>
			</>
		);
	} else {
		// success
		const { active, connectorName, account, networkId } = context;
		// balance is a BigNumber (in wei); format is as a sting (in ether)
		let etherString = ethers.utils.formatEther(currentBalance);

		return (
			active && (
				<>
					<h1>My account</h1>
					<p>Active Connector: {connectorName}</p>
					<p>Account: {account || 'None'}</p>
					<p>Network ID: {networkId}</p>
					<p>Current Balance: {etherString}</p>
					<button onClick={setCurrentHandle(context, safeSetCurrentBalance)}>
						Get Current Balance
					</button>
				</>
			)
		);
	}
}

export default dynamic(() => Promise.resolve(Account), {
	ssr: false
});
