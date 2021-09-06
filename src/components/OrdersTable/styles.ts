import styled from "styled-components";

export const Container = styled.div`
    margin-top: 4rem;

    @media (max-width: 1500px) {
        table {
                color: red;
                display: none;
            }

            table, th, td, tr {
                color: red;
                display: block;
                width: 100%;
            }

            tr {
                margin-bottom: 15px;
            }

            td {
                text-align: right;
                padding-left: 50%;
                text-align: right;
                position: relative;
            }

            td::before {
                content: attr(data-label);
                position: absolute;
                left: 0;
                width: 50%;
                padding-left: 15px;
                font-size: 15px;
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
            border-radius: 0.25rem;

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
    align-items: center;
    justify-content: center;
    margin-left: 1.5rem;
    cursor: pointer;
    margin-top: 1.1rem;
    

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