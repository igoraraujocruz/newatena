import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { Form } from '@unform/web';
import { ChangeEvent, useCallback, useState, useRef } from 'react';
import Button from '../Button';
import { useAuth } from '../../hooks/useAuth';
import {api} from '../../services/api'
import { FormHandles } from '@unform/core';

interface Order {
  id: string,
  name: string;
  unimedProtocol: string;
  unimedCard: string;
  typeOfHospitalization: string;
  sex: string;
  sector: string;
  createdAt: string;
  requester: string;
  orderHistories: [
    {
      id: string;
      message: string;
      user_id: string;
      createdAt: string;
    }
  ] 
}

interface ModalEditOrderProps {
    isOpen: boolean;
    onRequestClose: () => void
    currentOrder: Order;
}


export function ModalUploadOrder({isOpen, onRequestClose, currentOrder}: ModalEditOrderProps) {
  const { user } = useAuth()
  const formRef = useRef<FormHandles>(null);
  const [file, setFile] = useState({} as File);

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

      const data = new FormData();
      data.append('file', file)
      data.append("name", 'teste')
      data.append("order_id", currentOrder.id)
      data.append("user_id", user.id)

      api.post('/orders/upload/', data)
    },
    [currentOrder, file, user.id],
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
        <Form ref={formRef} onSubmit={handleUpload}>
            <h2>Importar documentos</h2>
            
            <input
            type='file'
            id='document'
            onChange={handleFile}
          />
            <Button type="submit">Confirmar Edição</Button>
        </Form>
        </Modal>
    )
}

