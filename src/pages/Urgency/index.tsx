import { Container } from './styles'
import { useState } from 'react';
import { Summary } from '../../components/Summary'
import { Header } from '../../components/Header';
import { ModalAddOrder } from '../../components/ModalAddOrder';
import { ModalEditOrder } from '../../components/ModalEditOrder';
import { ModalDeleteOrder } from '../../components/ModalDeleteOrder';
import { OrdersTable } from '../../components/OrdersTable'

interface Order {
    id: string;
    name: string
    sector: string
    sex: string
    typeOfHospitalization: string
    unimedCard: string
    unimedProtocol: string
  }
   

export function Urgency() {

    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [isOrderEditModalOpen, setIsOrderEditModalOpen] = useState(false);
    const [isDeleteOrderModalOpen, setIsDeleteOrderModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order>({} as Order);

    function handleOpenNewOrderModal() {
        setIsNewOrderModalOpen(true)
    }

    function handleOpenOrderEditModal(order: Order) {
        setCurrentOrder(order)
        setIsOrderEditModalOpen(true)
    }

    function handleOpenOrderDeleteModal(order: Order) {
        setCurrentOrder(order)
        setIsDeleteOrderModalOpen(true)
    }

    function handleCloseNewOrderModal() {
        setIsNewOrderModalOpen(false)
    }

    function handleCloseEditOrderModal() {
        setIsOrderEditModalOpen(false)
    }

    function handleCloseOrderDeleteModal() {
        setIsDeleteOrderModalOpen(false)
    }
    

    return (
        <>
            <Header />
            <ModalAddOrder isOpen={isNewOrderModalOpen} onRequestClose={handleCloseNewOrderModal} />
            <ModalEditOrder isOpen={isOrderEditModalOpen} onRequestClose={handleCloseEditOrderModal} currentOrder={currentOrder}/>
            <ModalDeleteOrder isOpen={isDeleteOrderModalOpen} onRequestClose={handleCloseOrderDeleteModal} currentOrder={currentOrder}/>
            <Container>
                <h1>Pronto Socorro</h1>
                <Summary onOpenNewOrderModal={handleOpenNewOrderModal} />
                <OrdersTable onOpenEditOrderModal={handleOpenOrderEditModal} onOpenDeleteOrderModal={handleOpenOrderDeleteModal}/>
            </Container>
        </>
    )
}