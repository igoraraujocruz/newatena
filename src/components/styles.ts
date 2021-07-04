import styled from 'styled-components';

export const Container = styled.header`
    background: var(--gray);
`;

export const Content = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
        font-size: 1rem;
        color: #FFF;
        background: var(--gray);
        border: 0;
        padding: 0 2rem;
        border-radius: 0.25rem;
        height: 2rem;

        transition: filter 0.2s;
        
        &:hover {
            filter: brightness(0.9);
        }
    }
`;