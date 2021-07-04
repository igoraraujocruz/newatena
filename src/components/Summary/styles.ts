import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    text-align: center;

    div {
        background: var(--shape);
        border-radius: 1.5rem;
        color: var(--text-title);

        header {
            display: flex;
            align-items: center;
            width: 6rem;
        }

        strong {
            display: block;
            margin-top: 1rem;
            font-size: 2rem;
            font-weight: 500;
            line-height: 1rem;
        }
        
        &.highlight-background {
            background: var(--green);
            color: #FFF;
        }
    }
`;