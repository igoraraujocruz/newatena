import styled from 'styled-components';
import {shade} from 'polished';

export const Container = styled.button`
    margin-top: 50px;
    background: #1C6A33;
    border-radius: 10px;
    border: 2px;
    padding: 16px;
    width: 50%;
    transition: 0.8s;
    color: #fff;      
    &:hover {
		background: ${shade(0.2, '#1C6A33')}
	}
`;