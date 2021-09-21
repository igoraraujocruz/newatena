import styled, { keyframes } from 'styled-components';
import { Form as Unform } from '@unform/web'
import {shade} from 'polished'

const apperFromLeft = keyframes`
	from {
		opacity: 0;
		transform: translateX(-50px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

export const Form = styled(Unform)`
	display: flex;
	flex-direction: column;
	justify-content: start;
    animation: ${apperFromLeft} 1s;
    color: var(--text-title);
	margin-right: 2rem;

	span {
		width: 15rem;
	}

	Button {
		display: flex;
		background-color: red;
		margin-top: 1rem;
		margin-left: 6rem;
		width: auto;

		:hover {
			background-color: ${shade(0.1, 'red')};
		}
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
    animation: ${apperFromLeft} 1s;
    color: var(--text-title);
	margin-right: 2rem;

	.btnExcludeOrder {
		background: 'blue';
		:hover {
			background: ${shade(0.2, '#0F2F4F')}
		}
	}

	Button {
		margin-top: 1rem;
		width: auto;

		:hover {
			background-color: ${shade(0.1, 'red')};
		}
	}
`;