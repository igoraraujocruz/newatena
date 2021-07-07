import { Container } from './styles'
import { useState } from 'react';
import { Summary } from '../../components/Summary'
import { Header } from '../../components/Header';
import { NewOrderModal } from '../../components/NewOrderModal';
import { OrdersTable } from '../../components/OrdersTable'

export function Urgency() {

    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewOrderModalOpen(true)
    }

    function handleCloseNewOrderModal() {
        setIsNewOrderModalOpen(false)
    }

    return (
        <>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
            <NewOrderModal isOpen={isNewOrderModalOpen} onRequestClose={handleCloseNewOrderModal}/>
            <Container>
                <Summary />
                <OrdersTable />
            </Container>
        </>
    )
}