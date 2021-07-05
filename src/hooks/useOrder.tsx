import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Order {
    id: number,
    name: string;
    unimedProtocol: string;
    unimedWallet: string;
    typeOfHospitalization: string;
    sex: string;
    sector: string;
    createdAt: string;
}
 
type OrderInput = Omit<Order, 'id' | 'createdAt'>;

interface OrdersProviderProps {
    children: ReactNode;
}

interface OrdersContextData {
    orders: Order[];
    createOrder: (order: OrderInput) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextData>({} as OrdersContextData);

export function OrdersProvider({children}: OrdersProviderProps) {
    const [orders, setOrders] = useState<Order[]>([]);


    useEffect(() => {
        api.get('orders')
        .then(response => setOrders(response.data.orders))
    }, []);

    async function createOrder(orderInput: OrderInput) {
     const response = await api.post('/orders', {
         ...orderInput,
         createdAt: new Date(),
     })
     
     const { order } = response.data;

     setOrders([
         ...orders,
         order
     ])
    }

    return (
        <OrdersContext.Provider value={{ orders, createOrder }}>
            {children}
        </OrdersContext.Provider>
    );
}

export function useOrder() {
    const context = useContext(OrdersContext);

    return context;
};
