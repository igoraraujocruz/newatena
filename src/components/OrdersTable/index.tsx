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

export function OrdersTable({onOpenEditOrderModal, onOpenDeleteOrderModal, onOpenHistoryOrderModal, onOpenUploadOrderModal, onOpenTransferOrderModal}: OrdersTableProps) {

    const {orders} = useOrder();

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
                    {orders && orders.filter(order => order.room == null).map(order => (
                            <tr key={order.id}>
                            <td>{order.name}</td>
                            <td>{order.unimedProtocol}</td>
                            <td>{order.unimedCard}</td>
                            <td className={order.typeOfHospitalization}>{order.typeOfHospitalization}</td>
                            <td>{order.sex}</td>
                            <td>{new Intl.DateTimeFormat('pt-BR', {month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: false}).format(
                                new Date(order.createdAt)
                            )}
                            </td>
                            <Buttons>
                                <EditIcon.GrEdit className="btnEdit" type="submit" onClick={() => onOpenEditOrderModal(order)}>Editar</EditIcon.GrEdit>
                                <RiHistoryFill size={20} className="btnHistory" type="submit" onClick={() => onOpenHistoryOrderModal(order)}>Histórico</RiHistoryFill>
                                <IoDocumentAttachOutline className="btnUpload" size={20} type="submit" onClick={()=> onOpenUploadOrderModal(order)}>Upload</IoDocumentAttachOutline>
                                <RiDeleteBin6Line size={20} className="deleteBnt" type="submit" onClick={()=> onOpenDeleteOrderModal(order)}>Deletar</RiDeleteBin6Line>
                                <RiSendPlaneFill size={20} type="submit" onClick={()=> onOpenTransferOrderModal(order)}>Transferir</RiSendPlaneFill>
                            </Buttons>
                            </tr>
                    ))
                    }
                    
                </tbody>
            </table>
        </Container>
    );
}