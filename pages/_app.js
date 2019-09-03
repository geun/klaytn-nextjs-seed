import App from 'next/app';
import { Connectors } from 'web3-react';

const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] });

const Infura = new NetworkOnlyConnector({
	providerURL: 'https://mainnet.infura.io/v3/...'
});

// const connectors = { MetaMask, Infura }
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
