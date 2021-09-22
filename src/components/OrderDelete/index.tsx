import { FormHandles } from '@unform/core';
import { useRef, useCallback, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import Button from '../Button';
import { useOrder } from '../../hooks/useOrder';
import { Container, Form } from './styles'
import {Order} from '../../interfaces/Order'

type OrderInput = Omit<Order, 'id' | 'createdAt' | 'requester'>;

interface DeleteOrderProps {
    currentOrder: Order;
    onRequestClose: () => void
}


export function OrderDelete({currentOrder, onRequestClose}: DeleteOrderProps) {

  const [ isDeleteButton, setIsDeleteButton] = useState(false)

  const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const { removeOrder } = useOrder();

   const handleDeleteOrder = useCallback(
    async (data: OrderInput) => {      
      
      try {
        await removeOrder(currentOrder.id)

        addToast({
          type: 'success',
          title: 'Solicitação excluida com sucesso',
        })

        onRequestClose()
        
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
    [addToast, currentOrder, removeOrder, onRequestClose],
  );

    return (
          <>
            {isDeleteButton ?
              <>
              <Form ref={formRef} onSubmit={handleDeleteOrder}>
                <span>Ao confirmar não será possível desfazer esta ação</span>   
                <Button className="btnConfirm" type="submit">Confirmar Exclusão</Button>
              </Form>
              <Container>
                <Button className="btnExcludeOrder" onClick={() => setIsDeleteButton(false)} type="submit">Cancelar Exclusão</Button>
              </Container>
              </>
              :
              <Container>
                <Button onClick={() => setIsDeleteButton(true)} type="submit">Excluir</Button>
              </Container>   
            }  
          </>
    )
}