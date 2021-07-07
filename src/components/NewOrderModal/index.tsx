import Modal from 'react-modal';
import { Container, OrderTypeContainer, RadioBox, SexContainer, RadioBoxG } from './styles'
import closeImg from '../../assets/close.svg'
import { FormEvent, useState } from 'react';
import { useOrder } from '../../hooks/useOrder';
import { useAuth } from '../../hooks/useAuth';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void
}

export function NewOrderModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const {createOrder} = useOrder();
    const { user } = useAuth()
    const [name, setName] = useState('');
    const [unimedProtocol, setUnimedProtocol] = useState('');
    const [unimedCard, setUnimedCard] = useState('');
    const [sex, setSex] = useState('');
    const [sector, setSector] = useState('pronto-socorro');
    const [typeOfHospitalization, setTypeOfHospitalization] = useState('clinica');

   async function handleCreateNewTransaction(event: FormEvent) {

        event.preventDefault();

        await createOrder({
            name,
            unimedProtocol,
            unimedCard,
            sex,
            typeOfHospitalization,
            sector,
            requester: user.id
        })

        setName('');
        setUnimedProtocol('');
        setUnimedCard('');
        setSex('');
        setTypeOfHospitalization('')
        onRequestClose();
        setSector('')
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
                value={unimedCard} 
                onChange={event => setUnimedCard(event.target.value)}
                 />

                <OrderTypeContainer>
                    <RadioBox 
                    type="button"
                    onClick={() => setTypeOfHospitalization('Clínica')}
                    isActive={typeOfHospitalization === 'Clínica'}
                    activeColor="green"
                    >
                        <span>Internação Clínica</span>
                    </RadioBox>
                    <RadioBox 
                    type="button"
                    onClick={() => setTypeOfHospitalization('Cirúrgica')}
                    isActive={typeOfHospitalization === 'Cirúrgica'}
                    activeColor="red"
                    >
                        <span>Internação Cirúrgica</span>
                    </RadioBox>

                    <RadioBox 
                    type="button"
                    onClick={() => setTypeOfHospitalization('Oncológica')}
                    isActive={typeOfHospitalization === 'Oncológica'}
                    activeColor="red"
                    >
                        <span>Internação Oncológica</span>
                    </RadioBox>

                </OrderTypeContainer>

                <SexContainer>
                <RadioBoxG 
                    type="button"
                    onClick={() => setSex('M')}
                    isActive={sex === 'M'}
                    activeColor="green"
                    >
                        <span>Masculino</span>
                </RadioBoxG>
                <RadioBoxG 
                    type="button"
                    onClick={() => setSex('F')}
                    isActive={sex === 'F'}
                    activeColor="green"
                    >
                        <span>Femino</span>
                </RadioBoxG>
                </SexContainer>

                <button type="submit">Solicitar</button>
            </Container>             
        </Modal>
    )
}