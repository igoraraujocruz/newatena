import { FormHandles } from '@unform/core';
import { useRef, useCallback} from 'react';
import { useToast } from '../../hooks/useToast';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import Input from '../Input';
import Button from '../Button';
import { useOrder } from '../../hooks/useOrder';
import {Order} from '../../interfaces/Order'
import {  Form } from './styles'

type OrderInput = Omit<Order, 'id' | 'createdAt' | 'requester' | 'room' | 'roomRequest'>;

interface OrderEditProps {
    currentOrder: Order;
}

export function OrderEdit({currentOrder}: OrderEditProps) {

  const formRef = useRef<FormHandles>(null);

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
    [addToast, editOrder, currentOrder],
  );

  

    return (
            <Form ref={formRef} onSubmit={handleEditOrder} initialData={currentOrder}>
                <span>Editar Internação</span>
                <section>                
                  <Input name="name" type="text" placeholder="Nome do Paciente" />
                  <Input name="unimedCard" type="text" placeholder="Cartão Unimed"/>
                  <Input name="unimedProtocol" type="text" placeholder="Atendimento"/>
                  <Input name="typeOfHospitalization" type="text" placeholder="Tipo de Internação"/>   
                  <Input name="sex" type="text" placeholder="sexo"/>
                </section>    
                <Button type="submit">Confirmar Edição</Button>
            </Form>
    )
}