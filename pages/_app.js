import React from 'react';
import App from 'next/app';

import Web3Provider, { Connectors } from 'web3-react';
const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector();

const Infura = new NetworkOnlyConnector({
	providerURL: 'https://mainnet.infura.io/v3/...'
});

const connectors = { MetaMask };

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Web3Provider connectors={connectors} libraryName={'ethers.js'}>
				<Component {...pageProps} />
			</Web3Provider>
		);
	}
}

export default MyApp;
