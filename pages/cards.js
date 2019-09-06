import React, { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import { Button, Divider, PageHeader, Typography } from 'antd';

const { Title, Text } = Typography;

import { useCaver } from '../hooks/useCaver';

import JSONPretty from 'react-json-pretty';
import { JsonContainer } from '../components/PrettyJson.style';

import axios from 'axios';
import NewCardInput from '../components/NewCardInput';

function getOwner(contract) {
	return contract.methods.owner().call();
}
function getCardCount({ contract, from }) {
	return contract.methods.getCardCount().call();
}

function executeMintCard({ contract, name, address, from }) {
	return contract.methods.mintCard(name, address).send({ from, gas: '300000' });
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

const MintableCard = ({ abi, contractAddress }) => {
	const context = useCaver();
	const [account, setAccount] = useState('');
	const [balance, setBalance] = useState('0');

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

	useEffect(() => {}, [balance]);
	useEffect(() => {
		if (contract === null) return;

		console.log('updated contract: ', contract);
		updateOwner(contract, setOwnerAddress);
		getCardCount({ contract, from: account.address }).then(count => {
			setCardCount(count);
			updateCard(contract, count - 1, setCurrentCard);
		});
	}, [contract]);

	async function onSubmit(values) {
		console.log('onSubmit');
		if (context === null) {
			alert('No provider');
			return;
		}

		const provider = context.getProvider();
		const { toPeb } = context.getUtils();

		const { name, address } = values;
		const transaction = await executeMintCard({
			contract,
			name,
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
				<Title>Mint Cards</Title>
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

MintableCard.getInitialProps = async ({ pathname }) => {
	console.log('MintableCard::getInitialProps', pathname);
	const abi = await axios.get(process.env.CONTRACT_ABI_JSON).then(res => {
		return res.data;
	});

	const { contractAddress } = await axios
		.get(process.env.CONTRACT_ADDRESS_JSON)
		.then(res => res.data);

	return { abi, contractAddress };
};

export default MintableCard;
