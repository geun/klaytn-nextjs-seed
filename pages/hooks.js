import React, { useState } from 'react';

function Example() {
	// Declare a new state variable, which we'll call "count"

	// const context = useState(0);
	// let count = context[0];
	// let setCount = context[1];

	const [count, setCount] = useState(0);

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		</div>
	);
}

export default Example