import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { Form } from '@unform/web';
import { ChangeEvent, useCallback, useState, useRef, useEffect } from 'react';
import { useToast } from '../../hooks/useToast';
import Button from '../Button';
import { useAuth } from '../../hooks/useAuth';
import {api} from '../../services/api'
import { FormHandles } from '@unform/core';
import Input from '../Input';
import { UploadFiles, Container, Inputs } from './styles'

interface Order {
  id: string,
  name: string;
  unimedProtocol: string;
  unimedCard: string;
  typeOfHospitalization: string;
  sex: string;
  room: string;
  roomRequest: [
    {
      id: string;
      room: string;
      message: string;
      isClean: boolean;
      user_id: string;
      order_id: string;
      hotel_management_user_id: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
  createdAt: string;
  requester: string;
  orderHistories: [
    {
      id: string;
      message: string;
      user_id: string;
      createdAt: string;
    }
  ];
}

interface UploadOrder {
  id: string,
  name: string;
  user_id: string;
  order_id: string;
  url: string;
  file: string;
  message: string;
  createdAt: string;
}

interface User {
  name: string;
}


interface ModalUploadOrderProps {
    isOpen: boolean;
    onRequestClose: () => void
    currentOrder: Order;
}


export function ModalUploadOrder({isOpen, onRequestClose, currentOrder}: ModalUploadOrderProps) {
  const { user } = useAuth()
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const [file, setFile] = useState({} as File);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [uploads, setUpload] = useState<UploadOrder[]>([]);

    useEffect(() => {
        api.get(`/orders/upload/${currentOrder.id}`)
        .then(response => setUpload(response.data))
    }, [currentOrder]);

  const handleFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        setFile(file)
        console.log(file)
      }
    },
    [],
  );

  const handleUpload = useCallback(() => {

    try {
      const data = new FormData();
      data.append("file", file)
      data.append("name", name)
      data.append("message", message)
      data.append("order_id", currentOrder.id)
      data.append("user_id", user.id)

      api.post('/orders/upload/', data)

      api.post('/orders/history/', {
        message: `${user.name} Anexou o arquivo ${name}`,
        order_id: currentOrder.id,
        user_id: user.id
       })

       addToast({
        type: 'success',
        title: 'Arquivo enviado com sucesso',
      }) 

      onRequestClose()
    } catch {
      addToast({
        type: 'error',
        title: 'Arquivo não enviado',
      }) 
    }
      
    },
    [currentOrder, file, user.id, addToast, onRequestClose, user.name, name, message],
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

        <p>Arquivos anexados:</p>
        
        <UploadFiles>
          {uploads.length === 0 && <p>Nenhum documento anexado até o momento...</p>}
          {uploads.map(upload => <a href={upload.url} key={upload.id} target="blank">{upload.name}</a>)}
        </UploadFiles>
        
        <Form ref={formRef} onSubmit={handleUpload}>
        <Container>
        <Inputs>     
            <Input
            name="name"
            type='text'
            id='name'
            placeholder="Insira um nome para o arquivo que deseja enviar"
            onChange={event => setName(event.target.value)}
            />          
            <input
            type='file'
            id='document'
            onChange={handleFile}
          />
          </Inputs>
          <textarea
            name="message"
            id='message'
            placeholder="Caso seja necessário, insira uma mensagem..."
            onChange={event => setMessage(event.target.value)}
            />
            <Button type="submit">Enviar Arquivo</Button>
            </Container>
        </Form>
        
        </Modal>
    )
}

