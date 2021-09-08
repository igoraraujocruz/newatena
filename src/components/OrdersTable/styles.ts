import styled from "styled-components";

export const Container = styled.div`
    margin-top: 4rem;
    display: flex;
    margin: auto;
    

    @media screen and (max-width: 800px) {
            thead {
                display: none;
            }

            tr {
                display: block;
                background-color: #0F2F4F;
                margin-bottom: 3rem;
            }


            td {
                display: block;
                text-align: right;
                padding-left: 50%;
                position: relative;
            }

            td::before {
                content: attr(data-title);
                position: absolute;
                left: 15px;
                font-weight: 600;
                font-size: 1rem;
            }
    }
    
    table {
        width: 100%;
        border-spacing: 0 0.5rem;

        th {
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;

        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);

            &:first-child {
                color: var(--text-body);
            }

            &.Clínica {
                color: var(--good-blue);
            }

            &.Cirúrgica {
                color: var(--good-blue);
            }

            &.Oncológica {
                color: var(--good-blue);
            }

            &.Covid {
                color: var(--red);
            }

            &.UTIP {
                color: var(--red);
            }

            &.UTIG {
                color: var(--red);
            }

            &.UCO {
                color: var(--red);
            }
        }
    }
`;

export const Buttons = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding: 1rem;
    color: white;

    .btnEdit {
        margin-left: 0.5rem;
    }

    .deleteBnt {
        margin-left: 0.5rem;
    }

    .btnHistory {
        margin-left: 0.5rem;
    }

    .btnUpload {
        margin-left: 0.5rem;
    }
`;