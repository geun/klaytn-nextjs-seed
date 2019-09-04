import React, { useState } from 'react';
import { Button } from 'antd';

function Example() {
	// Declare a new state variable, which we'll call "count"

	// const context = useState(0);
	// let count = context[0];
	// let setCount = context[1];

	const [count, setCount] = useState(0);

	return (
		<div style={{ marginTop: 24 }}>
			<p>You clicked {count} times</p>
			<Button onClick={() => setCount(count + 1)}>Click me</Button>
		</div>
	);
}

export default Example;
