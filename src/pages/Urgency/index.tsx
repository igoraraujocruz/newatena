import { Container } from './styles'
import { useState } from 'react';
import { Summary } from '../../components/Summary'
import { Header } from '../../components/Header';
import { ModalAddOrder } from '../../components/ModalAddOrder';
import { ModalUploadOrder } from '../../components/ModalUploadOrder';
import { ModalEditOrder } from '../../components/ModalEditOrder';
import { ModalDeleteOrder } from '../../components/ModalDeleteOrder';
import { ModalOrderHistory } from '../../components/ModalOrderHistory';
import { ModalTransferOrder } from '../../components/ModalTransferOrder';
import { OrdersTable } from '../../components/OrdersTable'
import {Order} from '../../interfaces/Order'

export function Urgency() {

    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [isOrderEditModalOpen, setIsOrderEditModalOpen] = useState(false);
    const [isDeleteOrderModalOpen, setIsDeleteOrderModalOpen] = useState(false);
    const [isHistoryOrderModalOpen, setIsHistoryOrderModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
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

    function handleOpenOrderHistoryModal(order: Order) {
        setCurrentOrder(order)
        setIsHistoryOrderModalOpen(true)
    }

    function handleOpenOrderUploadModal(order: Order) {
        setCurrentOrder(order)
        setIsUploadModalOpen(true)
    }

    function handleOpenTransferOrderModal(order: Order) {
        setCurrentOrder(order)
        setIsTransferModalOpen(true)
    }

    function handleCloseOrderHistoryModal() {
        setIsHistoryOrderModalOpen(false)
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

    function handleCloseOrderUploadModal() {
        setIsUploadModalOpen(false)
    }

    function handleCloseTransferOrderModal() {
        setIsTransferModalOpen(false)
    }
    

    return (
        <>
            <Header />
            <ModalAddOrder isOpen={isNewOrderModalOpen} onRequestClose={handleCloseNewOrderModal} />
            <ModalEditOrder isOpen={isOrderEditModalOpen} onRequestClose={handleCloseEditOrderModal} currentOrder={currentOrder}/>
            <ModalDeleteOrder isOpen={isDeleteOrderModalOpen} onRequestClose={handleCloseOrderDeleteModal} currentOrder={currentOrder}/>
            <ModalOrderHistory isOpen={isHistoryOrderModalOpen} onRequestClose={handleCloseOrderHistoryModal} currentOrder={currentOrder}/>
            <ModalUploadOrder isOpen={isUploadModalOpen} onRequestClose={handleCloseOrderUploadModal} currentOrder={currentOrder}/>
            <ModalTransferOrder isOpen={isTransferModalOpen} onRequestClose={handleCloseTransferOrderModal} currentOrder={currentOrder}/>
            <Container>
                <Summary onOpenNewOrderModal={handleOpenNewOrderModal} />
                <OrdersTable onOpenEditOrderModal={handleOpenOrderEditModal} onOpenDeleteOrderModal={handleOpenOrderDeleteModal} onOpenHistoryOrderModal={handleOpenOrderHistoryModal} onOpenUploadOrderModal={handleOpenOrderUploadModal} onOpenTransferOrderModal={handleOpenTransferOrderModal}/>
            </Container>
        </>
    )
}