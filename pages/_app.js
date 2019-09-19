import React from 'react';
import App from 'next/app';

// themes
import 'antd/dist/antd.min.css';
import '../themes/global';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../themes/default.theme';

// web3-react
import Container from '../components/Container';
import { CaverProvider } from '../hooks/useCaver';

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		const caverProviderName = process.env.CAVER_PROVIDER;
		return (
			<ThemeProvider theme={defaultTheme}>
				<CaverProvider options={{ provider: caverProviderName }}>
					<Container>
						<Component {...pageProps} />
					</Container>
				</CaverProvider>
			</ThemeProvider>
		);
	}
}

export default MyApp;
