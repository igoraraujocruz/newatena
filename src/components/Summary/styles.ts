import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    gap: 0.5rem;
    justify-content: flex-end;
    text-align: center;

    div {
        background: var(--shape);
        border-radius: 0.5rem;
        color: var(--text-title);


        strong {
            display: block;
            margin-top: 0.3rem;
            font-size: 1rem;
            font-weight: 500px;
        }
        
        &.highlight-background {
            background: var(--green);
            color: #FFF;
        }
    }

    Button {
        width: 10rem;
    }
`;