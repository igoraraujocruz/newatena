import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import {Order} from '../../interfaces/Order'
import { Container, Content} from './styles';
import { OrderHistory } from '../OrderHistory'
import { OrderUpload } from '../OrderUpload'
import { OrderEdit } from '../OrderEdit'
import { OrderRoomRequest } from '../OrderRoomRequest'
import { OrderDelete } from '../OrderDelete'


interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void
    currentOrder: Order;
}

const ModalStyles = {
  content: {
    top: '40%',
    left: '45%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '0',
    transform: 'translate(-50%, -50%)',
    minWidth: '95rem',
    minHeight: '50rem',
  },
};

export function ModalOrder({isOpen, onRequestClose, currentOrder}: ModalOrderProps) {

    return (   
        <Modal isOpen={isOpen} 
        style={ModalStyles}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        <button type="button" className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" onClick={onRequestClose} />
        </button>
        <Container>
              <OrderHistory order_id={currentOrder.id} />
            
              <OrderUpload currentOrder={currentOrder} />

              <OrderEdit currentOrder={currentOrder} />

              <OrderRoomRequest currentOrder={currentOrder} />
          </Container>
          <Content>
            <OrderDelete currentOrder={currentOrder} />
          </Content>
        </Modal>

    )
}