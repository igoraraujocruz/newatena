import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
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

interface ModalOrderHistoryProps {
    isOpen: boolean;
    onRequestClose: () => void
    currentOrder: Order;
}


export function ModalOrderHistory({isOpen, onRequestClose, currentOrder}: ModalOrderHistoryProps) {

    return (
        <Modal isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        <button type="button" className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" onClick={onRequestClose} />
        </button>
        {/*  */} 
        {currentOrder.orderHistories && currentOrder.orderHistories.map(orderHistory => (
          <ul key={orderHistory.id}>
            <li>{orderHistory.message} no dia: {new Intl.DateTimeFormat('pt-BR',  {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false}).format(
          new Date(orderHistory.createdAt))}</li>
          </ul>
        ))}
                      
        </Modal>
    )
}