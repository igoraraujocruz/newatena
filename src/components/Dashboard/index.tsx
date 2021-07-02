import { Container } from './styles'
import { Summary } from '../Summary'
import { OrdersTable } from '../OrdersTable'

export function Dashboard() {
    return (
        <Container>
            <Summary />
            <OrdersTable />
        </Container>
    )
}