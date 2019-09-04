import React, { useContext, useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import { useWeb3Context } from 'web3-react';

import { ethers } from 'ethers';
import { Button, Divider, PageHeader, notification } from 'antd';

const setCurrentHandle = (context, setHandler) => async e => {
	e.preventDefault();

	const account = await updateBalance(context, setHandler);
	openNotification(account);
};

const updateBalance = async (context, setCurrentBalance) => {
	if (!context.active) return;
	const { account, library } = context;
	const current = await library.getBalance(account);
	setCurrentBalance(current.toString());
	console.log('Balance updated');
	return account;
};

const initialEther = ethers.utils.parseEther('0');

const openNotification = account => {
	const args = {
		message: 'Update Current Balance',
		description: `Account: ${account.slice(0, 20)} ...`,
		duration: 5
	};
	notification.open(args);
};

function Account(props) {
	// const ethereum = {};
	if (ethereum && !!ethereum.autoRefreshOnNetworkChange) {
		console.log('SetAutoRefreshOnNetworkChange');
		ethereum.autoRefreshOnNetworkChange = false;
	}

	const context = useWeb3Context();
	const mountedRef = useRef(false);

	useEffect(() => {
		mountedRef.current = true;
		return () => (mountedRef.current = false);
	},[]);

	// const manager = useWeb3Manager();
	const [currentBalance, setCurrentBalance] = useState(initialEther);

	const safeSetCurrentBalance = (...args) => mountedRef.current && setCurrentBalance(...args);

	useEffect(() => {
		console.log('useEffect::contextChanged');
		updateBalance(context, safeSetCurrentBalance);
	}, [context]);

	useEffect(() => {
		console.log('useEffect::setFirstValidConnector');
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
					<PageHeader title={'My account'} subTitle={'Eth account with Metamask'} />
					<div style={{ padding: 24 }}>
						<p>Active Connector: {connectorName}</p>
						<p>Account: {account || 'None'}</p>
						<p>Network ID: {networkId}</p>
						<p>Current Balance: {etherString}</p>
						<Divider />
						<Button onClick={setCurrentHandle(context, safeSetCurrentBalance)}>
							Update Current Balance
						</Button>
					</div>
				</>
			)
		);
	}
}

export default dynamic(() => Promise.resolve(Account), {
	ssr: false
});
