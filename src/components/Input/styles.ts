import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
	isFocused: boolean;
	isFilled: boolean;
	isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
        background: #fff;
        border-radius: 10px;
        height: 50px;
        display: flex;
        align-items: center;
		border: 2px solid #fff;
		color: #666360;
        & + div {
			margin-top: 8px;
		}
		${props => props.isErrored && css`
			border-color: #c53030;
		`}
		${props => props.isFocused && css`
			border-color: #0F2F4F;
			color: #0F2F4F;
		`}
		${props => props.isFilled && css`
			color: #1C6A33;
		`}
	input {
		flex: 1;
		border: 0;
		margin-left: 10px;
		outline: none;
	
		&::placeholder {
			color: #666360;
		}
	}
	
	svg {
		margin: 0px;
	}
`;

export const Error = styled(Tooltip)`
	height: 20px;
	margin-left: 10px;
	svg {
		margin-right: 10px;
	}
	span {
			margin-bottom: 1.1rem;
			margin-right: -0.2rem;
			background: #c53030;
			color: #FFF;
			
			&::before {
      			border-color: #c53030 transparent;
			}
	}
`;