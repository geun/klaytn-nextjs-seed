import React, { createContext, useContext } from 'react';
import { useAsObservableSource, useLocalStore } from 'mobx-react-lite';

import Caver from 'caver-js';

const CaverContext = createContext();

const CaverStore = props => ({
	client: null,
	provider: props.provider,

	initializeWithContract({ privateKey, abi, contractAddress }) {
		const provider = this.getProvider();

		// clear wallet
		provider.accounts.wallet.clear();

		const decryptedAccount = provider.accounts.privateKeyToAccount(privateKey);
		const account = provider.accounts.wallet.add(decryptedAccount);
		const contract = new provider.Contract(abi, contractAddress);
		return { provider, contract, account };
	},

	updateProvider(newProvider) {
		this.provider = newProvider;
	},

	getProvider() {
		if (this.client !== null) {
			return this.client.klay;
		}
		if (this.provider === 'cypress') {
			this.client = new Caver('https://api.klaytn.net:8651/');
		} else if (this.provider === 'baobab') {
			this.client = new Caver('https://api.baobab.klaytn.net:8651/');
		} else {
			throw new Error('Invalid Provider Type');
		}

		return this.client.klay;
	},

	getUtils() {
		if (this.client !== null) {
			return this.client.utils;
		} else {
			throw new Error('No client');
		}
	}
});

export const CaverProvider = ({ children, options = { provider: 'cypress' } }) => {
	const defaultProps = useAsObservableSource(options);
	const store = useLocalStore(CaverStore, defaultProps);
	return <CaverContext.Provider value={store}>{children}</CaverContext.Provider>;
};

export const useCaver = () => {
	const store = useContext(CaverContext);
	if (!store) {
		// this is especially useful in TypeScript so you don't need to be checking for null all the time
		throw new Error('use CaverProvider');
	}
	return store;
};
