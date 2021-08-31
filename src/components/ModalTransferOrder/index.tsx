import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { useOrder } from '../../hooks/useOrder';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRef, useCallback, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import Button from '../Button';
import { RadioBox, ButtonConfirm, Container } from './styles';


interface Order {
  id: string,
  name: string;
  unimedProtocol: string;
  unimedCard: string;
  typeOfHospitalization: string;
  sex: string;
  room: string;
  roomRequest: [
    {
      id: string;
      room: string;
      message: string;
      isClean: boolean;
      user_id: string;
      order_id: string;
      hotel_management_user_id: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
  createdAt: string;
  requester: string;
  orderHistories: [
    {
      id: string;
      message: string;
      user_id: string;
      createdAt: string;
    }
  ];
}

interface ModalTransferOrderProps {
    isOpen: boolean;
    onRequestClose: () => void
    currentOrder: Order;
}

export function ModalTransferOrder({isOpen, onRequestClose, currentOrder}: ModalTransferOrderProps) {
    const formRef = useRef<FormHandles>(null);
    const [room, setRoom] = useState('');
    const { addToast } = useToast();
    const {transferOrder} = useOrder();


   const handleTransferOrder = useCallback(
    async () => {

      try {
        formRef.current?.setErrors({});

        await transferOrder({
          id: currentOrder.id,
          room: room,
        })

       addToast({
          type: 'success',
          title: 'Solicitação criada com sucesso',
        })
      
        onRequestClose();
        setRoom('');
        
      } catch (error) {
        
        addToast({
          type: 'error',
          title: 'Houve um problema',
          description: 'Informe todos os campos necessários',
        })
      }
    },
    [transferOrder, addToast, onRequestClose, currentOrder, room],
  );

    return (
        <Modal isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        <button type="button" className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" onClick={onRequestClose}/>
        </button>    
            <Container>
            <Form ref={formRef} onSubmit={handleTransferOrder}>   
            <RadioBox 
                    type="button"
                    onClick={() => setRoom('101')}
                    isActive={room === '101'}
                    activeColor="blue"
                    >
                        <span>101</span>
            </RadioBox>
            <RadioBox 
                    type="button"
                    onClick={() => setRoom('102')}
                    isActive={room === '102'}
                    activeColor="blue"
                    >
                        <span>102</span>
            </RadioBox>
            <RadioBox 
                    type="button"
                    onClick={() => setRoom('103')}
                    isActive={room === '103'}
                    activeColor="blue"
                    >
                        <span>103</span>
            </RadioBox>
                <ButtonConfirm>
                  <Button type="submit">Transferir</Button>
                </ButtonConfirm>
            </Form>
            </Container>             
        </Modal>
    )
}