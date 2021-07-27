import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { useOrder } from '../../hooks/useOrder';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRef, useCallback } from 'react';
import { useToast } from '../../hooks/useToast';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import Input from '../Input';
import Button from '../Button';

interface ModalAddOrderProps {
    isOpen: boolean;
    onRequestClose: () => void
}

interface OrderFormData {
    name: string
    sector: string
    sex: string
    typeOfHospitalization: string
    unimedCard: string
    unimedProtocol: string
}

export function ModalAddOrder({isOpen, onRequestClose}: ModalAddOrderProps) {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const {createOrder} = useOrder();

   const handleCreateNewOrder = useCallback(
    async (data: OrderFormData) => {

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

        await createOrder({
          name: data.name,
          sector: data.sector,
          sex: data.sex,
          typeOfHospitalization: data.typeOfHospitalization,
          unimedCard: data.unimedCard,
          unimedProtocol: data.unimedProtocol,
        })

        addToast({
          type: 'success',
          title: 'Solicitação criada com sucesso',
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
    [createOrder, addToast, onRequestClose],
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
            
            <Form ref={formRef} onSubmit={handleCreateNewOrder}>   
                <h2>Solicitar Internação</h2>
                
                <Input name="name" type="text" placeholder="Nome do Paciente"/>
                <Input name="unimedCard" type="text" placeholder="Cartão Unimed"/>
                <Input name="unimedProtocol" type="text" placeholder="Atendimento"/>
                <Input name="typeOfHospitalization" type="text" placeholder="Tipo de Internação"/> 
                <Input name="sex" type="text" placeholder="sexo"/> 
                <Input name="sector" type="text" placeholder="Setor"/>
                <Button type="submit">Solicitar</Button>
            </Form>             
        </Modal>
    )
}