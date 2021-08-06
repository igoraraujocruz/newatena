import styled from 'styled-components';
import {shade} from 'polished';

export const Container = styled.div`

    p {
        margin-top: 2rem;
    }
`;

export const Buttons = styled.div`
    display: flex;

    .btnConfirm {
        margin-right: 3rem;
        background-color: #A52A2A;
        &:hover {
		background: ${shade(0.2, '#A52A2A')}
        }
    }
`;