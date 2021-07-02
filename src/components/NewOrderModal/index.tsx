import Modal from 'react-modal';
import { Container, OrderTypeContainer, RadioBox } from './styles'
import closeImg from '../../assets/close.svg'
import { FormEvent, useState } from 'react';
import { useOrder } from '../../hooks/useOrder';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void
}

export function NewOrderModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const {createOrder} = useOrder();
    const [name, setName] = useState('');
    const [unimedProtocol, setUnimedProtocol] = useState('');
    const [unimedWallet, setUnimedWallet] = useState('');
    const [sex, setSex] = useState('');
    const [typeOfHospitalization, setTypeOfHospitalization] = useState('deposit');

   async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createOrder({
            name,
            unimedProtocol,
            unimedWallet,
            sex,
            typeOfHospitalization,
        })

        setName('');
        setUnimedProtocol('');
        setUnimedWallet('');
        setSex('');
        onRequestClose();
    }

    return (
        <Modal isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        <button type="button" className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" onClick={onRequestClose}/>
        </button>    
            
            <Container onSubmit={handleCreateNewTransaction}>   
                <h2>Solicitar Internação</h2>
                
                <input placeholder="Nome" 
                value={name} 
                onChange={event => setName(event.target.value)}/>

                <input placeholder="Atendimento" 
                value={unimedProtocol} 
                onChange={event => setUnimedProtocol(event.target.value)}/>

                <input  placeholder="Carteira Unimed"
                value={unimedWallet} 
                onChange={event => setUnimedWallet(event.target.value)}
                 />

                <OrderTypeContainer>
                    <RadioBox 
                    type="button"
                    onClick={() => setTypeOfHospitalization('deposit')}
                    isActive={typeOfHospitalization === 'deposit'}
                    activeColor="green"
                    >
                        <span>Internação Clínica</span>
                    </RadioBox>
                    <RadioBox 
                    type="button"
                    onClick={() => setTypeOfHospitalization('cirurgica')}
                    isActive={typeOfHospitalization === 'cirurgica'}
                    activeColor="red"
                    >
                        <span>Internação Cirúrgica</span>
                    </RadioBox>

                    <RadioBox 
                    type="button"
                    onClick={() => setTypeOfHospitalization('withdraw')}
                    isActive={typeOfHospitalization === 'withdraw'}
                    activeColor="red"
                    >
                        <span>Internação Oncológica</span>
                    </RadioBox>
                </OrderTypeContainer>

                <RadioBox 
                    type="button"
                    onClick={() => setSex('masculine')}
                    isActive={sex === 'masculine'}
                    activeColor="green"
                    >
                        <span>Masculino</span>
                    </RadioBox>
                    <RadioBox 
                    type="button"
                    onClick={() => setSex('feminine')}
                    isActive={sex === 'feminine'}
                    activeColor="red"
                    >
                        <span>Femino</span>
                </RadioBox>

                <button type="submit">Solicitar</button>
            </Container>             
        </Modal>
    )
}