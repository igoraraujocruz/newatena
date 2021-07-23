import { Container } from './styles'
import { useState } from 'react';
import { Summary } from '../../components/Summary'
import { Header } from '../../components/Header';
import { ModalAddOrder } from '../../components/ModalAddOrder';
import { ModalEditOrder } from '../../components/ModalEditOrder';
import { OrdersTable } from '../../components/OrdersTable'
import { useOrder } from '../../hooks/useOrder';

interface Order {
    id: string;
    name: string
    sector: string
    sex: string
    typeOfHospitalization: string
    unimedCard: string
    unimedProtocol: string
}

interface EditOrder {
    name: string
    sector: string
    sex: string
    typeOfHospitalization: string
    unimedCard: string
    unimedProtocol: string
  }
   

export function Urgency() {

    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [ isEditModalOpen, setEditModalOpen ] = useState(false)
    const [ editingOrder, setEditingOrder ] = useState<Order>({} as Order)
    const {editOrder} = useOrder()


    function handleOpenNewOrderModal() {
        setIsNewOrderModalOpen(true)
    }

    function handleCloseNewOrderModal() {
        setIsNewOrderModalOpen(false)
    }

    function handleOpenEditModal() {
        setEditModalOpen(true)
    }

    function handleCloseEditModal() {
        setEditModalOpen(false)
    }

    function handleEditModalOrder(order: Order) {
        setEditModalOpen(true)
        setEditingOrder(order)
    }

    const handleUpdateOrder = async (order: EditOrder) => {
        console.log('vamover')
      }


    return (
        <>
            <Header />
            <ModalAddOrder isOpen={isNewOrderModalOpen} onRequestClose={handleCloseNewOrderModal} />
            <ModalEditOrder isOpen={isEditModalOpen} onRequestClose={handleCloseEditModal} editingOrder={editingOrder} handleUpdateOrder={handleUpdateOrder} />
            <Container>
                <h1>Pronto Socorro</h1>
                <Summary onOpenNewOrderModal={handleOpenNewOrderModal} />
                <OrdersTable onOpenEditOrderModal={handleOpenEditModal} handleEditModalOrder={handleEditModalOrder} />
            </Container>
        </>
    )
}