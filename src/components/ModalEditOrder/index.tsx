import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRef, useCallback } from 'react';
import { useToast } from '../../hooks/useToast';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import Input from '../Input';
import Button from '../Button';

interface Order {
  id: string;
  name: string
  sector: string
  sex: string
  typeOfHospitalization: string
  unimedCard: string
  unimedProtocol: string
}

interface EditOrder {
  name: string
  sector: string
  sex: string
  typeOfHospitalization: string
  unimedCard: string
  unimedProtocol: string
}

interface ModalEditOrderProps {
    isOpen: boolean;
    onRequestClose: () => void
    handleUpdateOrder: (data: EditOrder) => void;
    editingOrder: Order;
}


export function ModalEditOrder({isOpen, onRequestClose, handleUpdateOrder, editingOrder}: ModalEditOrderProps) {

  const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();

   const handleEditOrder = useCallback(
    async (data: EditOrder) => {

      handleUpdateOrder(data);

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
    [addToast],
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
            
            <Form ref={formRef} onSubmit={handleEditOrder} initialData={editingOrder}>   
                <h2>Editar Internação</h2>
                
                <Input name="name" type="text" placeholder="Nome do Paciente" />
                <Input name="unimedCard" type="text" placeholder="Cartão Unimed"/>
                <Input name="unimedProtocol" type="text" placeholder="Atendimento"/>
                <Input name="typeOfHospitalization" type="text" placeholder="Tipo de Internação"/>   
                <Input name="sex" type="text" placeholder="sexo"/>  
                <Input name="sector" type="text" placeholder="Setor"/>
                <Button type="submit">Confirmar Edição</Button>
            </Form>             
        </Modal>
    )
}