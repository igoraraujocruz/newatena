import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { useOrder } from '../../hooks/useOrder';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRef, useCallback, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import Button from '../Button';
import { ButtonConfirm, Container } from './styles';
import {Order} from '../../interfaces/Order'


interface ModalTransferOrderProps {
    isOpen: boolean;
    onRequestClose: () => void
    currentOrder: Order;
}

export function ModalTransferOrder({isOpen, onRequestClose, currentOrder}: ModalTransferOrderProps) {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const {transferOrder} = useOrder();


   const handleTransferOrder = useCallback(
    async () => {
      try {
        formRef.current?.setErrors({});
        await transferOrder({
          id: currentOrder.id,
        })

       addToast({
          type: 'success',
          title: 'Solicitação criada com sucesso',
        })
      
        onRequestClose();
        
      } catch (error) {
        
        addToast({
          type: 'error',
          title: 'Houve um problema',
          description: 'Informe todos os campos necessários',
        })
      }
    },
    [transferOrder, addToast, onRequestClose, currentOrder],
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
                <ButtonConfirm>
                  <Button type="submit">Transferir</Button>
                </ButtonConfirm>
            </Form>
            </Container>             
        </Modal>
    )
}