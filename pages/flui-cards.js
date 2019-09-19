import React, { useEffect, useRef, useState } from 'react';

// lib
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useCaver } from '../hooks/useCaver';

// ui
import { Button, Divider, PageHeader, Typography } from 'antd';
const { Title, Text } = Typography;

// pretty json
import JSONPretty from 'react-json-pretty';
import { JsonContainer } from '../components/PrettyJson.style';

import NewCardInput from '../components/NewCardInput';

function getOwner(contract) {
	return contract.methods.owner().call();
}

function getCardCount({ contract, from }) {
	return contract.methods.getCardCount().call();
}

function executeMintCard({ contract, name, balance, address, from }) {
	return contract.methods.mintCard(name, balance, address).send({ from, gas: '300000' });
}

function getCard(contract, index) {
	try {
		console.log('getCard: ', index);
		return contract.methods.cards(index).call();
	} catch (e) {
		console.log(e);
		return null;
	}
}

async function updateCard(contract, cardIndex, setCard) {
	if (cardIndex < 0) return;
	const card = await getCard(contract, cardIndex);
	setCard(card);
}

async function updateOwner(contract, setOwner) {
	const owner = await getOwner(contract);
	setOwner(owner);
}

const FLUICard = ({ abi, contractAddress }) => {
	const context = useCaver();
	const [account, setAccount] = useState('');

	const [lastTransaction, setLastTransaction] = useState({});

	const [contract, setContract] = useState(null);
	const [currentCard, setCurrentCard] = useState({});
	const [ownerAddress, setOwnerAddress] = useState('');
	const [cardCount, setCardCount] = useState(0);

	function initializer() {
		if (context === null) return;

		const provider = context.getProvider();

		// clear wallet
		provider.accounts.wallet.clear();

		const decryptedAccount = provider.accounts.privateKeyToAccount(
			process.env.KLAYTN_PRIVATE_KEY
		);
		const addedAccount = provider.accounts.wallet.add(decryptedAccount);
		setAccount(addedAccount);

		const loadedContract = new provider.Contract(abi, contractAddress);
		setContract(loadedContract);
	}

	useEffect(() => {
		initializer();
	}, [context]);

	useEffect(() => {
		if (contract === null) return;

		console.log('updated contract: ', contract);
		updateOwner(contract, setOwnerAddress);
		getCardCount({ contract, from: account.address }).then(count => {
			setCardCount(count);
			updateCard(contract, count - 1, setCurrentCard);
		});
	}, [contract]);

	// { name: string, address: string, balance: number }
	async function onSubmit(values) {
		console.log('onSubmit');
		if (context === null) {
			alert('No provider');
			return;
		}

		const provider = context.getProvider();
		const { toPeb } = context.getUtils();

		const { name, balance, address } = values;
		// const balance = 1;
		// const balance = process.env.BLANCE;

		const transaction = await executeMintCard({
			contract,
			name,
			balance,
			address,
			from: account.address
		});

		setLastTransaction(transaction);

		const count = await getCardCount({ contract, from: account.address });
		setCardCount(count);
		updateCard(contract, count - 1, setCurrentCard);
	}

	return (
		<>
			{/*<PageHeader title={'Mint Cards'} />*/}
			<div style={{ paddingTop: 24 }}>
				<Title>FLUI Cards</Title>
				<Text>Account: {account.address}</Text>
				<br />
				<Text>Contract Address: {contractAddress}</Text>
				<br />
				<Text>Contract Owner: {ownerAddress}</Text>
				<br />
				<Text>Current Minted Card Count: {cardCount}</Text>
				<br />
			</div>

			<Divider />

			<NewCardInput onSubmit={onSubmit} />
			<Divider />

			<JsonContainer>
				<Title level={2}>Cards</Title>
				<JSONPretty data={currentCard} />
				<Divider />
				<Title level={2}>Last Transaction</Title>
				<JSONPretty data={lastTransaction} />
			</JsonContainer>
		</>
	);
};

const NoSSRFLUICard = dynamic(
	() => {
		return Promise.resolve(FLUICard);
	},
	{
		ssr: false
	}
);

const FLUICardPage = props => {
	return (
		<>
			<NoSSRFLUICard {...props} />
		</>
	);
};

FLUICardPage.getInitialProps = async ({ pathname }) => {
	const CONTRACT_ABI_JSON = process.env.FLUI_CARD_CONTRACT_ABI_JSON;
	const CONTRACT_ADDRESS_JSON = process.env.FLUI_CARD_CONTRACT_ADDRESS_JSON;

	const privateKey = process.env.KLAYTN_PRIVATE_KEY;
	const abi = await axios.get(CONTRACT_ABI_JSON).then(res => {
		return res.data;
	});

	const { contractAddress } = await axios.get(CONTRACT_ADDRESS_JSON).then(res => res.data);

	return { privateKey, abi, contractAddress };
};

export default FLUICardPage;
