import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

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

interface OrderHistory {
  id: string,
  name: string;
  message: string;
  createdAt: string; 
}

interface ModalOrderHistoryProps {
    isOpen: boolean;
    onRequestClose: () => void
    currentOrder: Order;
}


export function ModalOrderHistory({isOpen, onRequestClose, currentOrder}: ModalOrderHistoryProps) {

  const [ordersHistory, setOrdersHistory] = useState<OrderHistory[]>([]);

    useEffect(() => {
        api.get(`/orders/history/${currentOrder.id}`)
        .then(response => setOrdersHistory(response.data))
    }, [setOrdersHistory, currentOrder.id]);

    return (
        <Modal isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        <button type="button" className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" onClick={onRequestClose} />
        </button>

        {ordersHistory.map(orderHistory => <li>{orderHistory.message}, dia: {new Intl.DateTimeFormat('pt-BR',  {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false}).format(
          new Date(orderHistory.createdAt))}</li>)}
                      
        </Modal>
    )
}