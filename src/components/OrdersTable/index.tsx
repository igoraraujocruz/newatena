import { useOrder } from '../../hooks/useOrder';
import { Container, Buttons } from './styles';
import {GrEdit} from 'react-icons/gr';
import {RiDeleteBin6Line, RiHistoryFill, RiSendPlaneFill} from 'react-icons/ri';
import {IoDocumentAttachOutline} from 'react-icons/io5';
import {Order} from '../../interfaces/Order'


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
                        <th>Reg. Leitos</th>
                        <th>Hotelaria</th>
                    </tr>
                </thead>
                <tbody>
                    {orders ? orders.filter(order => order.room == null).map(order => (
                            <tr key={order.id}>
                            <td data-title="Nome">{order.name}</td>
                            <td data-title="Atendimento">{order.unimedProtocol}</td>
                            <td data-title="Cartão Unimed">{order.unimedCard}</td>
                            <td data-title="Tipo de Internação" className={order.typeOfHospitalization}>{order.typeOfHospitalization}</td>
                            <td data-title="Sexo">{order.sex}</td>
                            <td data-title="Data">{new Intl.DateTimeFormat('pt-BR', {month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: false}).format(
                                new Date(order.createdAt)
                            )}
                            </td>
                            <td data-title="Reg. de Leitos">{order.roomRequest == null ? <p>Aguardando direcionamento...</p> : <p>{order.roomRequest.map(req => req.room).slice(-1)}</p>}</td>
                            <td data-title="Hotelaria">{order.roomRequest && order.roomRequest.map(req => req.isClean).slice(-1).some(clean => clean === true) ? <p>Quarto liberado!</p> : <p>Aguardando liberação da hotelaria...</p>}</td>
                            <Buttons>
                                <GrEdit size={20} className="btnEdit" type="submit" onClick={() => onOpenEditOrderModal(order)}>Editar</GrEdit>
                                <RiHistoryFill size={20} className="btnHistory" type="submit" onClick={() => onOpenHistoryOrderModal(order)}>Histórico</RiHistoryFill>
                                <IoDocumentAttachOutline className="btnUpload" size={20} type="submit" onClick={()=> onOpenUploadOrderModal(order)}>Upload</IoDocumentAttachOutline>
                                <RiDeleteBin6Line size={20} className="deleteBnt" type="submit" onClick={()=> onOpenDeleteOrderModal(order)}>Deletar</RiDeleteBin6Line>
                                <RiSendPlaneFill size={20} type="submit" onClick={()=> onOpenTransferOrderModal(order)}>Transferir</RiSendPlaneFill>
                            </Buttons>
                            </tr>
                    ))
                    : <p>Carregando...</p>
                    }
                    
                </tbody>
            </table>
        </Container>
    );
}