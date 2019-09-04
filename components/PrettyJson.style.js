import styled from 'styled-components';

const JsonContainer = styled.div`


	.__json-pretty__ {
		padding: 25px;
		line-height: 1.3;
		color: rgba(248, 248, 242, 1);
		background: #1e1e1e;
		overflow: auto;
	}

	.__json-key__ {
		color: #ffffff;
	}

	.__json-value__ {
		color: #AE81FF;
	}
	
	.__json-string__ {
		color: #E6DB74;
	}

	.__json-boolean__ {
		color: #F92672;
	}
`;

export { JsonContainer };
