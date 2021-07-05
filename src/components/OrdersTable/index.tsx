import { useOrder } from '../../hooks/useOrder';
import { Container } from './styles';

export function OrdersTable() {

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
                    {orders.filter(order => order.sector === 'pronto-socorro').map(order => (
                            <tr key={order.id}>
                            <td>{order.name}</td>
                            <td>{order.unimedProtocol}</td>
                            <td>{order.unimedWallet}</td>
                            <td className={order.typeOfHospitalization}>{order.typeOfHospitalization}</td>
                            <td>{order.sex}</td>
                            <td>{new Intl.DateTimeFormat('pt-BR').format(
                                new Date(order.createdAt)
                            )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}