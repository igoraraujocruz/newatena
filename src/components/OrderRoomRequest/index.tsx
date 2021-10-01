import { useOrder } from '../../hooks/useOrder';
import { FormHandles } from '@unform/core';
import { useRef, useCallback, useState, useEffect } from 'react';
import { useToast } from '../../hooks/useToast';
import Button from '../Button';
import { Form } from './styles';
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

type RoomRequestInput = Pick<RoomRequest, 'room' | 'message' | 'order_id' | 'user_id'>;


interface OrderRoomRequestProps {
    currentOrder: Order;
}

export function OrderRoomRequest({currentOrder}: OrderRoomRequestProps) {
    const { user } = useAuth()
    const { createRoomRequest } = useRoomRequest()
    const [roles, setRole] = useState<Roles[]>([])
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const {transferOrder} = useOrder();

    const lastRoomRequest = currentOrder.roomRequest?.[0]

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
      
        
      } catch (error) {
        
        addToast({
          type: 'error',
          title: 'Houve um problema',
          description: 'Informe todos os campos necessários',
        })
      }
    },
    [transferOrder, addToast, currentOrder],
  );

  const handleRequestRoom = useCallback(
    async (data: RoomRequestInput) => {      
      
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          room: Yup.string().required('Informar o quarto'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await createRoomRequest({
          message: data.message,
          room: data.room,
          order_id: currentOrder.id,
        })
        
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
    [addToast, currentOrder, createRoomRequest],
  );
  


    return (
        <> 
              {roles.map(role => role.name).includes('assistant_urgency' || 'analyst_urgency') ? 
                <Form ref={formRef} onSubmit={handleRequestRoom} initialData={lastRoomRequest}>   
                    <span>Pedido de Quarto</span>
                    
                    <Input name="room" type="text" placeholder="Digite um quarto" />
                    <Input name="message" type="text" placeholder="Observações"/>
                    <Button type="submit">Confirmar Pedido</Button>
                    <Button onClick={handleTransferOrder}>Transferir</Button>
                </Form>
              :
              <p>Verificando permissões...</p>
              }              
      </>         
    )
}