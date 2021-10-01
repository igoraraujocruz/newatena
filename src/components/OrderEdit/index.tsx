import { FormHandles } from '@unform/core';
import { useRef, useCallback, useState} from 'react';
import { useToast } from '../../hooks/useToast';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import Input from '../Input';
import Button from '../Button';
import { useOrder } from '../../hooks/useOrder';
import {Order} from '../../interfaces/Order'
import { Form } from '@unform/web';
import { RadioBox, RadioBoxG, TypeOfHospitalizaionButtons, SelectGender } from './styles';

type OrderInput = Omit<Order, 'id' | 'createdAt' | 'requester' | 'room' | 'roomRequest'>;

interface OrderEditProps {
    currentOrder: Order;
}

export function OrderEdit({currentOrder}: OrderEditProps) {
  const [typeOfHospitalization, setTypeOfHospitalization] = useState('');
  const [sex, setSex] = useState('');

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
          sex: sex,
          typeOfHospitalization: typeOfHospitalization,
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
    [addToast, editOrder, currentOrder, typeOfHospitalization, sex],
  );

  

    return (
            <Form ref={formRef} onSubmit={handleEditOrder} initialData={currentOrder}>
                <span>Editar Internação</span>              
                  <Input name="name" type="text" placeholder="Nome do Paciente" />
                  <Input name="unimedCard" type="text" placeholder="Cartão Unimed"/>
                  <Input name="unimedProtocol" type="text" placeholder="Atendimento"/>
                  <TypeOfHospitalizaionButtons>
                  <RadioBox 
                      type="button"
                      onClick={() => setTypeOfHospitalization('Clínica')}
                      isActive={typeOfHospitalization === 'Clínica'}
                      activeColor="blue"
                      >
                          <span>Clínica</span>
                  </RadioBox>
                  <RadioBox 
                      type="button"
                      onClick={() => setTypeOfHospitalization('Cirúrgica')}
                      isActive={typeOfHospitalization === 'Cirúrgica'}
                      activeColor="blue"
                      >
                          <span>Cirúrgica</span>
                  </RadioBox>
                  <RadioBox 
                      type="button"
                      onClick={() => setTypeOfHospitalization('Oncológica')}
                      isActive={typeOfHospitalization  === 'Oncológica'}
                      activeColor="blue"
                      >
                          <span>Oncológica</span>
                  </RadioBox>
                  <RadioBox 
                      type="button"
                      onClick={() => setTypeOfHospitalization('UTIP')}
                      isActive={typeOfHospitalization  === 'UTIP'}
                      activeColor="blue"
                      >
                          <span>UTIP</span>
                  </RadioBox>
                  <RadioBox 
                      type="button"
                      onClick={() => setTypeOfHospitalization('UTIG')}
                      isActive={typeOfHospitalization  === 'UTIG'}
                      activeColor="blue"
                      >
                          <span>UTIG</span>
                  </RadioBox>
                  <RadioBox 
                      type="button"
                      onClick={() => setTypeOfHospitalization('UCO')}
                      isActive={typeOfHospitalization  === 'UCO'}
                      activeColor="blue"
                      >
                          <span>UCO</span>
                  </RadioBox>
                  <RadioBox 
                      type="button"
                      onClick={() => setTypeOfHospitalization('Covid')}
                      isActive={typeOfHospitalization  === 'Covid'}
                      activeColor="blue"
                      >
                          <span>Covid</span>
                  </RadioBox>
                </TypeOfHospitalizaionButtons>
                <SelectGender>
                  <RadioBoxG 
                      type="button"
                      onClick={() => setSex('M')}
                      isActive={currentOrder.sex === 'M'}
                      activeColor="blue"
                      >
                          <span>Masculino</span>
                  </RadioBoxG>

                  <RadioBoxG 
                      type="button"
                      onClick={() => setSex('F')}
                      isActive={currentOrder.sex === 'F'}
                      activeColor="blue"
                      >
                          <span>Feminino</span>
                  </RadioBoxG>

                </SelectGender>   
                <Button type="submit">Confirmar Edição</Button>
            </Form>
    )
}