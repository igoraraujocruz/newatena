import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRef, useCallback } from 'react';
import { useToast } from '../../hooks/useToast';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import Button from '../Button';
import { useOrder } from '../../hooks/useOrder';
import { Container } from './styles'

interface Order {
  id: string;
  name: string
  sector: string
  sex: string
  typeOfHospitalization: string
  unimedCard: string
  unimedProtocol: string
}

type OrderInput = Omit<Order, 'id' | 'createdAt' | 'requester'>;

interface ModalEditOrderProps {
    isOpen: boolean;
    onRequestClose: () => void
    currentOrder: Order;
}


export function ModalDeleteOrder({isOpen, onRequestClose, currentOrder}: ModalEditOrderProps) {

  const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const { removeOrder } = useOrder();

   const handleDeleteOrder = useCallback(
    async (data: OrderInput) => {      
      
      try {
        await removeOrder(currentOrder.id)

        onRequestClose();

        addToast({
          type: 'success',
          title: 'Solicitação excluida com sucesso',
        })
        
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors =  getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
        
        addToast({
          type: 'error',
          title: 'Houve um problema ao tentar excluir a internação',
          description: 'Favor entrar em contato com o suporte',
        })
      }
    },
    [addToast, onRequestClose, currentOrder],
  );

    return (
      <Container>
        <Modal isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        <button type="button" className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" onClick={onRequestClose} />
        </button>    
            
            <Form ref={formRef} onSubmit={handleDeleteOrder}>   
                <h4>Tem certeza que deseja excluir a solicitação de internação de {currentOrder.name}?</h4>
                <p>Após a confirmação, não será possível recuperar estes mesmos dados</p>
                
                <Button type="submit">Confirmar Exclusão</Button>
                <Button onClick={onRequestClose}>Cancelar</Button>
            </Form>             
        </Modal>
      </Container>  
    )
}