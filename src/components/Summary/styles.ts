import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    gap: 0.5rem;
    margin-top: -14rem;
    justify-content: flex-end;

    div {
        background: var(--shape);
        padding: 1rem;
        border-radius: 2rem;
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
            text-align: center;
        }

        &.highlight-background {
            background: var(--green);
            color: #FFF;
        }
    }
`;