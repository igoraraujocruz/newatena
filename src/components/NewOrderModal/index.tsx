import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { useOrder } from '../../hooks/useOrder';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRef, useCallback } from 'react';
import { useToast } from '../../hooks/useToast';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface NewOrderModalProps {
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

export function NewOrderModal({isOpen, onRequestClose}: NewOrderModalProps) {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const {createOrder} = useOrder();

   const handleCreateNewOrder = useCallback(
    async (data: OrderFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
      });

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
        });

        onRequestClose();
      
      } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors =  getValidationErrors(err);
            formRef.current?.setErrors(errors);
          }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Nsei q carai',
        });
      }
    },
    [createOrder, addToast],
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
                
                <Input name="name" type="text" placeholder="nome"/>
                <Input name="unimedCard" type="text" placeholder="unicard"/>
                <Input name="unimedProtocol" type="text" placeholder="unimedProtocol"/>
                <Input name="typeOfHospitalization" type="text" placeholder="typeOfHospitalization"/>
                <Input name="sex" type="text" placeholder="sex"/>
                <Input name="sector" type="text" placeholder="sector"/>
                <Button type="submit">Solicitar</Button>
            </Form>             
        </Modal>
    )
}