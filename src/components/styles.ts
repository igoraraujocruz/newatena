import styled from 'styled-components';

export const Content = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    .btnRequestOrder {
        color: #11101d;
        font-size: 1.2rem;
        border-radius: 0.25rem;
        border: 0;
        padding: 0 2rem;
        transition: filter 0.2s;
        cursor: pointer;

        &:hover {
            filter: contrast(2);
        }

    }
`;