import { useOrder } from '../../hooks/useOrder';
import { Container } from './styles';
import Button from '../Button';
import * as EditIcon from 'react-icons/gr';
import * as DeleteIcon from 'react-icons/ri';

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
    onOpenDeleteOrderModal: (order: Order) => void;   
}

export function OrdersTable({onOpenEditOrderModal, onOpenDeleteOrderModal}: OrdersTableProps) {

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
                            <td>
                            <EditIcon.GrEdit type="submit" onClick={() => onOpenEditOrderModal(order)}>Editar</EditIcon.GrEdit>
                            <DeleteIcon.RiDeleteBin6Line type="submit" onClick={()=> onOpenDeleteOrderModal(order)}>Deletar</DeleteIcon.RiDeleteBin6Line>
                            </td>
                            
                            </tr>
                    ))
                    }
                    
                </tbody>
            </table>
        </Container>
    );
}