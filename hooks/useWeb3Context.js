import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const getWeb3OjbectFromWindow = resolve => {
	let { web3 } = window;
	const alreadyInjected = typeof web3 !== 'undefined'; // i.e. Mist/Metamask
	const localProvider = `http://localhost:9545`;

	if (alreadyInjected) {
		console.log(`Injected web3 detected.`);
		web3 = new Web3(web3.currentProvider);
	} else {
		console.log(`No web3 instance injected, using Local web3.`);
		const provider = new Web3.providers.HttpProvider(localProvider);
		web3 = new Web3(provider);
	}

	return web3;
};

export function useWeb3Context() {
	const [web3, setWeb3Object] = useState(null);

	function setWeb3Handle() {
		setWeb3Object(getWeb3OjbectFromWindow());
	}

	useEffect(() => {
		window.addEventListener(`load`, setWeb3Handle);

		// If document has loaded already, try to get Web3 immediately.
		if (document.readyState === `complete`) {
			console.log('document.readyState::complete');
			setWeb3Object(getWeb3OjbectFromWindow());
		}

		return () => {
			window.removeEventListener(`load`, setWeb3Handle);
		};
	}, []);

	return web3;
}
