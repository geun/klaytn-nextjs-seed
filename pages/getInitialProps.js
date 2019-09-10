import fetch from 'isomorphic-unfetch';

class PageComponent extends React.Component {
	state = {
		stars: 0
	};

	constructor(props) {
		super(props);
		this.handleOnClick = this.handleOnClick.bind(this);
	}

	async componentDidMount() {
		this.fetchStar();
	}

	async fetchStar() {
		const res = await fetch('https://api.github.com/repos/zeit/next.js');
		const json = await res.json();

		this.setState(state => ({
			...state,
			stars: json.stargazers_count
		}));
	}

	handleOnClick = () => {
		fetchStar();
	};

	render() {
		return (
			<div>
				Next stars: {stars}
				<button>Update Star</button>
			</div>
		);
	}
}

function Page({ stars }) {
	return <div>Next stars: {stars}</div>;
}

Page.getInitialProps = async ({ req }) => {
	const res = await fetch('https://api.github.com/repos/zeit/next.js');
	const json = await res.json();
	return { stars: json.stargazers_count };
};

export default Page;
