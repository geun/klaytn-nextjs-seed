import React from 'react';
import Link from 'next/link';

export default () => (
	<ul>
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
	</ul>
);
