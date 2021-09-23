import styled from 'styled-components';
import {darken} from 'polished'

export const Container = styled.div`
    
    h2 {
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
        text-align: center;
    }

`;

interface RadioBoxProps {
    isActive: boolean;
    activeColor: 'blue' | 'white';
}

const colors = {
    blue: '#0F2F4F',
    white: '#FFFFFF'
}

export const TypeOfHospitalizaionButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;


export const RadioBox = styled.button<RadioBoxProps>`
    height: 4rem;
    width: 30%;
    margin-left: 0.25rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    background: ${(props) => props.isActive 
    ? colors[props.activeColor]
    : 'transparent'
    };
    text-align: center;

    transition: border-color 0.2s;

    &:hover {
        border-color: ${darken(0.1, '#d7d7d7')};
    }

    img {
        width: 20px;
        height: 20px;
    }

    span {
        font-size: 1rem;
        color: ${(props) => props.isActive 
        ? '#fff'
        : '#0F2F4F'
        };
    }
`;

export const SelectGender = styled.div`
    margin-top: 1rem;
    color:red;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
`;

export const RadioBoxG = styled.button<RadioBoxProps>`
    height: 4rem;
    width: 100%;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    background: ${(props) => props.isActive 
    ? colors[props.activeColor]
    : 'transparent'
    };
    align-items: center;
    justify-content: center;

    transition: border-color 0.2s;

    &:hover {
        border-color: ${darken(0.1, '#d7d7d7')};
    }

    span {
        display: inline;
        margin-left: 1rem;
        font-size: 1rem;
        color: ${(props) => props.isActive 
        ? '#fff'
        : '#0F2F4F'
        };        
    }
`;

export const ButtonConfirm = styled.div`
    display: flex;
    justify-content: center;
`;