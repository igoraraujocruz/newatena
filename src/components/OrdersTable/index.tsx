import { useOrder } from '../../hooks/useOrder';
import { Container } from './styles';
import {Order} from '../../interfaces/Order'


interface OrdersTableProps {
    onOpenOrderModal: (order: Order) => void;
}

export function OrdersTable({onOpenOrderModal}: OrdersTableProps) {

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
                            <tr key={order.id} onClick={() => onOpenOrderModal(order)}>   
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
                            </tr>
                    ))
                    : <p>Carregando...</p>
                    }
                    
                </tbody>
            </table>
        </Container>
    );
}