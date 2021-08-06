import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import { api } from '../../services/api';

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
      message: string;
      user_id: string;
    }
  ]  
}

interface OrderHistory {
  id: string
  message: string
  createdAt: string
}


interface ModalOrderHistoryProps {
    isOpen: boolean;
    onRequestClose: () => void
    currentOrder: Order;
}


export function ModalOrderHistory({isOpen, onRequestClose, currentOrder}: ModalOrderHistoryProps) {
  const [ordersHistory, setOrderHistory] = useState<OrderHistory[]>([])

  useEffect(() => {
    api.get(`order/history/${currentOrder.id}`)
    .then(response => setOrderHistory(response.data))
}, []);

console.log(currentOrder)

    return (
        <Modal isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        <button type="button" className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" onClick={onRequestClose} />
        </button> 
        {ordersHistory.map(orderHistory => (   
        <ul key={orderHistory.id}>
          <li>{orderHistory.message} - {new Intl.DateTimeFormat('pt-BR',  {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false}).format(
          new Date(orderHistory.createdAt)
          )}</li>
        </ul>
        ))}
                      
        </Modal>
    )
}