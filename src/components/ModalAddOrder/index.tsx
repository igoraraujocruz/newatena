import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { useOrder } from '../../hooks/useOrder';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRef, useCallback, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import Input from '../Input';
import Button from '../Button';
import { RadioBox, RadioBoxG, ButtonConfirm, Container } from './styles';

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
    const [typeOfHospitalization, setTypeOfHospitalization] = useState('');
    const [sex, setSex] = useState('');
    const [sector, setSector] = useState('pronto-socorro');
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
          unimedProtocol: Yup.string().required('Informar o atendimento é obrigatório'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await createOrder({
          name: data.name,
          sector: sector,
          sex: sex,
          typeOfHospitalization: typeOfHospitalization,
          unimedCard: data.unimedCard,
          unimedProtocol: data.unimedProtocol,
        })

        addToast({
          type: 'success',
          title: 'Solicitação criada com sucesso',
        })
        

        onRequestClose();
        setSex('')
        setTypeOfHospitalization('')
        
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
    [createOrder, addToast, onRequestClose, typeOfHospitalization, sector, sex],
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
            <Form ref={formRef} onSubmit={handleCreateNewOrder}>   
                <h2>Solicitar Internação</h2>
                
                <Input name="name" type="text" placeholder="Nome do Paciente"/>
                <Input name="unimedCard" type="text" placeholder="Cartão Unimed"/>
                <Input name="unimedProtocol" type="text" placeholder="Atendimento"/>
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
                    isActive={typeOfHospitalization === 'Oncológica'}
                    activeColor="blue"
                    >
                        <span>Oncológica</span>
                </RadioBox>
                <RadioBox 
                    type="button"
                    onClick={() => setTypeOfHospitalization('UTIP')}
                    isActive={typeOfHospitalization === 'UTIP'}
                    activeColor="blue"
                    >
                        <span>UTIP</span>
                </RadioBox>
                <RadioBox 
                    type="button"
                    onClick={() => setTypeOfHospitalization('UTIG')}
                    isActive={typeOfHospitalization === 'UTIG'}
                    activeColor="blue"
                    >
                        <span>UTIG</span>
                </RadioBox>
                <RadioBox 
                    type="button"
                    onClick={() => setTypeOfHospitalization('UCO')}
                    isActive={typeOfHospitalization === 'UCO'}
                    activeColor="blue"
                    >
                        <span>UCO</span>
                </RadioBox>
                <RadioBox 
                    type="button"
                    onClick={() => setTypeOfHospitalization('Covid')}
                    isActive={typeOfHospitalization === 'Covid'}
                    activeColor="blue"
                    >
                        <span>Covid</span>
                </RadioBox>
                <RadioBoxG 
                    type="button"
                    onClick={() => setSex('M')}
                    isActive={sex === 'M'}
                    activeColor="blue"
                    >
                        <span>Masculino</span>
                </RadioBoxG>

                <RadioBoxG 
                    type="button"
                    onClick={() => setSex('F')}
                    isActive={sex === 'F'}
                    activeColor="blue"
                    >
                        <span>Feminino</span>
                </RadioBoxG>
                <ButtonConfirm>
                  <Button type="submit">Solicitar</Button>
                </ButtonConfirm>
            </Form>
            </Container>             
        </Modal>
    )
}