import { useOrder } from '../../hooks/useOrder';
import { Container } from './styles';
import Button from '../Button';

interface Order {
    id: string;
    name: string
    sector: string
    sex: string
    typeOfHospitalization: string
    unimedCard: string
    unimedProtocol: string
  }
  

interface OrdersTableProps {
    onOpenEditOrderModal: (order: Order) => void;
    handleEditModalOrder: (order: Order) => void;
}

export function OrdersTable({onOpenEditOrderModal}: OrdersTableProps) {

    const {orders, removeOrder} = useOrder();

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
                    {orders && orders.filter(order => order.sector === 'pronto-socorro').map(order => (
                            <tr key={order.id}>
                            <td>{order.name}</td>
                            <td>{order.unimedProtocol}</td>
                            <td>{order.unimedCard}</td>
                            <td className={order.typeOfHospitalization}>{order.typeOfHospitalization}</td>
                            <td>{order.sex}</td>
                            <td>{new Intl.DateTimeFormat('pt-BR').format(
                                new Date(order.createdAt)
                            )}
                            </td>
                            <Button type="submit" onClick={() => onOpenEditOrderModal(order)}>Editar</Button>
                            <Button type="submit" onClick={()=> removeOrder(order.id)}>Deletar</Button>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </Container>
    );
}