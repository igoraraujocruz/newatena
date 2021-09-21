import styled from 'styled-components';
import { Form as Unform } from '@unform/web'

export const Form = styled(Unform)`
    display: flex;
    flex-direction: column;
    text-align: start;
    color: var(--text-title);

    span {
        color: var(--text-title);
        display: block;
    }

    textarea {
        margin-top: 1rem;
        height: 7rem;
        width: 100%;
    }

    input {
        margin-top: 1rem;
    }

    section {
        margin-top: 0.50rem;
    }

    Button {
        margin-top: 0.25rem;
        width: auto;
    }
`;