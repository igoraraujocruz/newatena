import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    text-align: center;

    div {
        background: var(--shape);
        border-radius: 0.5rem;
        color: var(--text-title);
        width: 5rem;
        height: 3rem;


        strong {
            display: block;
            margin-top: 0.3rem;
            font-size: 1rem;
            font-weight: 500px;
        }
    }

    Button {
        width: 10rem;
    }
`;