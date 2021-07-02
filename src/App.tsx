import React from 'react';
import { useState } from 'react';
import { GlobalStyle } from './styles/global';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { OrdersProvider } from './hooks/useOrder'
import { NewOrderModal } from './components/NewOrderModal';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function App() {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewOrderModalOpen(true)
  }

  function handleCloseNewOrderModal() {
    setIsNewOrderModalOpen(false)
  }
  return (
    <>
    <OrdersProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewOrderModal isOpen={isNewOrderModalOpen} onRequestClose={handleCloseNewOrderModal}/>
      <GlobalStyle />
    </OrdersProvider>  
    </>
  );
}