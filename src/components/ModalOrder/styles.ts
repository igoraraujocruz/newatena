import styled, { keyframes } from 'styled-components';

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

export const Container = styled.div`
    animation: ${apperFromLeft} 1s;
    display: flex;
    text-align: center;
    justify-content: space-between;
`;

export const Content = styled.div`
    animation: ${apperFromLeft} 1s;
    display: flex;
	margin-top: 15rem;
	align-items: flex-end;
    text-align: end;
    justify-content: flex-end;

`;