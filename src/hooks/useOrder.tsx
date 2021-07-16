import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Order {
    id: number,
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
        .then(response => setOrders(response.data))
    }, []);

    console.log(orders)

    async function createOrder(orderInput: OrderInput) {
     
     const token = localStorage.getItem('@Atena:token');   
     const response = await api.post('/orders', {
         ...orderInput,
     }, {
         headers: {
            authorization: `Bearer ${token}`
         }
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
