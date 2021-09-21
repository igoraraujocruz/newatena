import { Container } from './styles'
import { useState } from 'react';
import { Summary } from '../../components/Summary'
import { Header } from '../../components/Header';
import { ModalAddOrder } from '../../components/ModalAddOrder';
import { ModalOrder } from '../../components/ModalOrder';
import { OrdersTable } from '../../components/OrdersTable'
import {Order} from '../../interfaces/Order'

export function Urgency() {

    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order>({} as Order);

    function handleOpenNewOrderModal() {
        setIsNewOrderModalOpen(true)
    }

    function handleOpenOrderModal(order: Order) {
        setCurrentOrder(order)
        setIsOrderModalOpen(true)
    }

    function handleCloseNewOrderModal() {
        setIsNewOrderModalOpen(false)
    }

    function handleCloseOrderModal() {
        setIsOrderModalOpen(false)
    }
    

    return (
        <>
            <Header />
            <ModalAddOrder isOpen={isNewOrderModalOpen} onRequestClose={handleCloseNewOrderModal} />
            <ModalOrder isOpen={isOrderModalOpen} onRequestClose={handleCloseOrderModal} currentOrder={currentOrder}/>
            <Container>
                <Summary onOpenNewOrderModal={handleOpenNewOrderModal} />
                
                <OrdersTable onOpenOrderModal={handleOpenOrderModal}/>
            </Container>
        </>
    )
}