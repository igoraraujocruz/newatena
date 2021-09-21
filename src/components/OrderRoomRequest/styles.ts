import styled from 'styled-components';
import { Form as Unform } from '@unform/web'

export const Form = styled(Unform)`
	display: flex;
	flex-direction: column;
	justify-content: start;
    color: var(--text-title);

	Input {
		width: 1rem;
	}

	Button {
		margin-top: 1rem;
		width: auto;
	}
`;