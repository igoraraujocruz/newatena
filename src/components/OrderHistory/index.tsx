import { Container } from './styles';
import { useHistory } from '../../hooks/useHistory';


interface OrderHistoryProps {
    order_id: string;
}


export function OrderHistory({order_id}: OrderHistoryProps) {
  const {GetOrderById, histories} = useHistory();
  GetOrderById(order_id)


    return (
        <Container>
          
          {histories.map(orderHistory => <li key={orderHistory.id}>{new Intl.DateTimeFormat('pt-BR',  {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false}).format(
          new Date(orderHistory.createdAt))}: {orderHistory.message}</li>)}
        </Container>                      
    )
}