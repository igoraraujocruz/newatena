import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRef, useCallback, useState, useEffect } from 'react';
import { useToast } from '../../hooks/useToast';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import Input from '../Input';
import Button from '../Button';
import { useOrder } from '../../hooks/useOrder';
import { useRoomRequest } from '../../hooks/useRoom';
import {Order} from '../../interfaces/Order'
import {RoomRequest} from '../../interfaces/RoomRequest'
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

type OrderInput = Omit<Order, 'id' | 'createdAt' | 'requester' | 'room' | 'roomRequest'>;
type RequestRoomInput = Pick<RoomRequest, 'room' | 'message' | 'order_id' | 'user_id'>;

interface Roles {
  name: string;
}

interface ModalEditOrderProps {
    isOpen: boolean;
    onRequestClose: () => void
    currentOrder: Order;
}


export function ModalEditOrder({isOpen, onRequestClose, currentOrder}: ModalEditOrderProps) {

  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth()
  const { createRoomRequest } = useRoomRequest()
  const [roles, setRole] = useState<Roles[]>([])

  useEffect(() => {
    api.get(`users/${user.id}`)
    .then(response => setRole(response.data.roles))
    }, [user.id]);

    const { addToast } = useToast();
    const { editOrder } = useOrder();

   const handleEditOrder = useCallback(
    async (data: OrderInput) => {      
      
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Informar o nome do paciente obrigatório'),
          unimedCard: Yup.string().required('Informar o cartão unimed do paciente é obrigatório'),
          typeOfHospitalization: Yup.string().required('Informar o tipo de internação é obrigatório'),
          unimedProtocol: Yup.string().required('Informar o atendimento é obrigatório'),
          sex: Yup.string().required('Informar o sexo do paciente é obrigatório'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await editOrder({
          id: currentOrder.id,
          name: data.name,
          sex: data.sex,
          typeOfHospitalization: data.typeOfHospitalization,
          unimedCard: data.unimedCard,
          unimedProtocol: data.unimedProtocol,
        })

        onRequestClose();
        
      } catch (error) {
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
    [addToast, editOrder, onRequestClose, currentOrder],
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
    [addToast, currentOrder, user.id, createRoomRequest, onRequestClose],
  );

    return (
        <Modal isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        <button type="button" className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" onClick={onRequestClose} />
        </button>    
            
            <Form ref={formRef} onSubmit={handleEditOrder} initialData={currentOrder}>   
                <h2>Editar Internação</h2>
                
                <Input name="name" type="text" placeholder="Nome do Paciente" />
                <Input name="unimedCard" type="text" placeholder="Cartão Unimed"/>
                <Input name="unimedProtocol" type="text" placeholder="Atendimento"/>
                <Input name="typeOfHospitalization" type="text" placeholder="Tipo de Internação"/>   
                <Input name="sex" type="text" placeholder="sexo"/>  
                <Button type="submit">Confirmar Edição</Button>
            </Form>

            {roles.map(role => role.name).includes('assistant_urgency' || 'analyst_urgency') && 
              <Form ref={formRef} onSubmit={handleRequestRoom}>   
                  <h2>Pedido de Quarto</h2>
                  
                  <Input name="room" type="text" placeholder="Quarto" />
                  <Input name="message" type="text" placeholder="Cartão Mensagem"/>
                  <Button type="submit">Confirmar Pedido</Button>
              </Form>
            }              
        </Modal>
    )
}