import styled from "styled-components";

export const Container = styled.main`
    max-width: 1120px;
    margin: 0 auto;
    padding: 2.5rem 1rem;

    h1 {
        text-align: center;
    }

    .blocs {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        div {
            margin: 0.5rem;
            border-radius: 2rem;
            background-color: black;
            width: 10rem;
            height: 10rem;

            p {
                color: white;
                text-align: center;
            }
        }
    }
`;