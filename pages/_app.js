import React from 'react';
import App from 'next/app';

// themes
import 'antd/dist/antd.min.css';
import '../themes/global';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../themes/default.theme';

// web3-react
import Web3Provider, { Connectors } from 'web3-react';
import Container from '../components/Container';
import { CaverProvider } from '../hooks/useCaver';
const { InjectedConnector, NetworkOnlyConnector } = Connectors;
const MetaMask = new InjectedConnector();
const Infura = new NetworkOnlyConnector({
	providerURL: 'https://mainnet.infura.io/v3/...'
});

const connectors = { MetaMask };

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		const caverProviderName = process.env.CAVER_PROVIDER;
		return (
			<ThemeProvider theme={defaultTheme}>
				<Web3Provider connectors={connectors} libraryName={'ethers.js'}>
					<CaverProvider options={{provider: caverProviderName}}>
						<Container>
							<Component {...pageProps} />
						</Container>
					</CaverProvider>
				</Web3Provider>
			</ThemeProvider>
		);
	}
}

export default MyApp;
