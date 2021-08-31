import { useOrder } from '../../hooks/useOrder';
import { Container, Buttons } from './styles';
import * as EditIcon from 'react-icons/gr';
import {RiDeleteBin6Line, RiHistoryFill, RiSendPlaneFill} from 'react-icons/ri';
import {IoDocumentAttachOutline} from 'react-icons/io5';


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
  

interface OrdersTableProps {
    onOpenEditOrderModal: (order: Order) => void;
    onOpenDeleteOrderModal: (order: Order) => void;
    onOpenUploadOrderModal: (order: Order) => void;
    onOpenHistoryOrderModal: (order: Order) => void;
    onOpenTransferOrderModal: (order: Order) => void;   
}

export function OrdersCM1({onOpenEditOrderModal, onOpenDeleteOrderModal, onOpenHistoryOrderModal, onOpenUploadOrderModal, onOpenTransferOrderModal}: OrdersTableProps) {

    const {orders} = useOrder();
    const rooms = ['101', '102', '103']

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Atendimento</th>
                        <th>Carteira Unimed</th>
                        <th>Tipo de Internação</th>
                        <th>Sexo</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    
                {orders.map(order => order.room).some(item => rooms.includes(item)) && <li>Teste</li>}
                    
                </tbody>
            </table>
        </Container>
    );
}