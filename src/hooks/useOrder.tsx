import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Order {
    id: string,
    name: string;
    unimedProtocol: string;
    unimedCard: string;
    typeOfHospitalization: string;
    sex: string;
    sector: string;
    requester: string;
    createdAt: string;
}
 
type OrderInput = Omit<Order, 'id' | 'createdAt' | 'requester'>;
type OrderEdit = Omit<Order, 'createdAt' | 'requester'>;


interface OrdersProviderProps {
    children: ReactNode;
}

interface OrdersContextData {
    orders: Order[];
    createOrder: (order: OrderInput) => Promise<void>;
    removeOrder: (orderId: string) => void;
    editOrder: (order: OrderEdit) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextData>({} as OrdersContextData);

export function OrdersProvider({children}: OrdersProviderProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [editingOrder, setEditingOrder] = useState<OrderEdit>({} as OrderEdit);

    useEffect(() => {
        api.get('orders')
        .then(response => setOrders(response.data))
    }, [setOrders]);

    const createOrder = async(orderInput: OrderInput) => {
     const response = await api.post('/orders', {
         ...orderInput,
     })
          
     const order = response.data;

     setOrders([
         ...orders,
         order
     ])
    }

    const removeOrder = async (orderId: string) => {
        try {
          const orderIndex = orders.findIndex(order => order.id === orderId);
    
          if (orderIndex >= 0) {
            orders.splice(orderIndex, 1);
            await api.delete(`/orders/${orderId}`)
            setOrders([...orders]);
          } else {
            throw Error();
          }
        } catch {
          alert('Erro na remoção da ordem');
        }
    };


    //Mexer no edit
    const editOrder = async (orderEdit: OrderEdit) => {
      const orderUpdated = await api.put(`/orders/${orderEdit.id}`, {
        ...editingOrder, ...orderEdit
      });

      const ordersUpdated = orders.map(order => order.id !== orderUpdated.data.id ? order : orderUpdated.data);

      setOrders(ordersUpdated)
    };

    return (
        <OrdersContext.Provider value={{ orders, createOrder, removeOrder, editOrder }}>
            {children}
        </OrdersContext.Provider>
    );
}

export function useOrder() {
    const context = useContext(OrdersContext);

    return context;
};
