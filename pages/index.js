import React from 'react';
import Link from 'next/link';
import { Divider } from 'antd';

export default () => (
	<>
		<h1 style={{ marginBottom: 8 }}>Sample </h1>
		<p style={{ margin: 0, color: '#aaaaaa' }}>Nextjs + Web3 + Antd</p>
		<Divider />
		<ul style={{ padding: 24 }}>
			<li>
				<Link href="/account">
					<a>Account</a>
				</Link>
			</li>
			<li>
				<Link href="/hooks">
					<a>Hooks sample</a>
				</Link>
			</li>
			<li>
				<Link href={{ pathname: '/samples', query: { id: '2', username: 'jessi' } }}>
					<a>Sample</a>
				</Link>
			</li>
			<li>
				<Link href={{ pathname: '/posts', query: { id: '2' } }} as="/posts/2">
					<a>Post #2</a>
				</Link>
			</li>
			<li>
				<Link href="/code">
					<a>Code</a>
				</Link>
			</li>
			<li>
				<Link href="/klaytn">
					<a>Klaytn</a>
				</Link>
			</li>

		</ul>
	</>
);
