import styled from 'styled-components';
import {shade} from 'polished';

export const Container = styled.button`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    background: #0F2F4F;
    border-radius: 10px;
    border: 2px;
    padding: 16px;
    width: 50%;
    transition: 0.8s;
    color: #fff;      
    &:hover {
		background: ${shade(0.2, '#0F2F4F')}
	}
`;