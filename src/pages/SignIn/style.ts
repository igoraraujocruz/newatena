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
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    animation: ${apperFromLeft} 1s;
    
    form {
        width: 250px;
        text-align: center;
    }
    
    > h1 {
        margin-bottom: 5px;
    }
`;

export const Logo = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
    
    img {
        width: 15rem;
    }
`;