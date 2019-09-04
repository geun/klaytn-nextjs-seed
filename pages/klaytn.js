import React, { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import { Button, Divider, PageHeader } from 'antd';

import TestAccount from '../lib/klaytn/test-account';
import { useCaver } from '../hooks/useCaver';
import AmountInput from '../components/AmountInput';

import JSONPretty from 'react-json-pretty';
import { JsonContainer } from '../components/PrettyJson.style';

function createKlaytn() {
	const account = caver.klay.accounts.create();
}

function loadTestAccount() {}

function sendTestTransaction({
	amount = 1,
	provider,
	fromAddress,
	toAddress = '0xeF5cd886C7f8d85fbe8023291761341aCBb4DA01'
}) {
	console.log('sendTestTransaction');

	return provider.sendTransaction({
		type: 'VALUE_TRANSFER',
		from: fromAddress,
		to: toAddress,
		gas: '300000',
		value: amount
	});
}

const KlaytnAccount = () => {
	const context = useCaver();
	const [account, setAccount] = useState('');
	const [balance, setBalance] = useState('0');

	const [lastTransaction, setLastTransaction] = useState({});

	useEffect(() => {
		if (context === null) return;

		const provider = context.getProvider();
		const decryptedAccount = provider.accounts.decrypt(TestAccount, 'klaytest1234!');

		// clear wallet
		provider.accounts.wallet.clear();

		const addedAccount = provider.accounts.wallet.add(decryptedAccount);
		setAccount(addedAccount);
	}, [context]);

	console.log(account);

	useEffect(() => {}, [balance]);

	async function send(values) {
		if (context === null) {
			alert('No provider');
			return;
		}

		const provider = context.getProvider();
		const { toPeb } = context.getUtils();

		const amount = parseInt(values.amount * 1000); // decimal to integer
		const transaction = await sendTestTransaction({
			provider,
			amount: toPeb(amount, 'mKLAY'),
			fromAddress: account.address,
			toAddress: values.address
		});

		setLastTransaction(transaction);
	}

	return (
		<>
			<PageHeader title={'My Klaytn account'} />
			<div style={{ padding: 24 }}>Account: {account.address}</div>

			<Divider />

			<AmountInput onSubmit={send} />

			<Divider />

			<JsonContainer>
				<JSONPretty data={lastTransaction} />
			</JsonContainer>
		</>
	);
};

export default dynamic(() => Promise.resolve(KlaytnAccount), {
	ssr: false
});
