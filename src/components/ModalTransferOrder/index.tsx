import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { useOrder } from '../../hooks/useOrder';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRef, useCallback, useState, useEffect } from 'react';
import { useToast } from '../../hooks/useToast';
import Button from '../Button';
import { ButtonConfirm, Container } from './styles';
import {Order} from '../../interfaces/Order'
import Input from '../Input';
import {RoomRequest} from '../../interfaces/RoomRequest';
import * as Yup from 'yup';
import { useRoomRequest } from '../../hooks/useRoom';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

interface Roles {
  name: string;
}

type RequestRoomInput = Pick<RoomRequest, 'room' | 'message' | 'order_id' | 'user_id'>;


interface ModalTransferOrderProps {
    isOpen: boolean;
    onRequestClose: () => void
    currentOrder: Order;
}

export function ModalTransferOrder({isOpen, onRequestClose, currentOrder}: ModalTransferOrderProps) {
    const { user } = useAuth()
    const { createRoomRequest } = useRoomRequest()
    const [roles, setRole] = useState<Roles[]>([])
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const {transferOrder} = useOrder();

    useEffect(() => {
      api.get(`users/${user.id}`)
      .then(response => setRole(response.data.roles))
      }, [user.id]);


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

  const handleRequestRoom = useCallback(
    async (data: RequestRoomInput) => {      
      
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          room: Yup.string().required('Informar o quarto'),
          message: Yup.string().required('Informar mensagem'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await createRoomRequest({
          message: data.message,
          room: data.room,
          order_id: currentOrder.id,
        })

        onRequestClose();
        
      } catch (error) {
        console.log(error)
        if (error instanceof Yup.ValidationError) {
          const errors =  getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
        
        addToast({
          type: 'error',
          title: 'Houve um problema',
          description: 'Informe todos os campos necessários',
        })
      }
    },
    [addToast, currentOrder, createRoomRequest, onRequestClose],
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
            {roles.map(role => role.name).includes('assistant_urgency' || 'analyst_urgency') && 
              <Form ref={formRef} onSubmit={handleRequestRoom} initialData={currentOrder.roomRequest}>   
                  <h2>Pedido de Quarto</h2>
                  
                  <Input name="room" type="text" placeholder="Quarto" />
                  <Input name="message" type="text" placeholder="Cartão Mensagem"/>
                  <Button type="submit">Confirmar Pedido</Button>
              </Form>
            }

            <Form ref={formRef} onSubmit={handleTransferOrder}>   
                <ButtonConfirm>
                  <Button type="submit">Transferir</Button>
                </ButtonConfirm>
            </Form> 
            </Container>             
        </Modal>
    )
}