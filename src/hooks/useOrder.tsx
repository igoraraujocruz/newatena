import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from '../hooks/useHistory';
import {Order} from '../interfaces/Order'

 
type OrderInput = Omit<Order, 'id' | 'createdAt' | 'requester' | 'orderHistories' | 'uploads' |  'room' | 'roomRequest'>;
type OrderEdit = Omit<Order, 'createdAt' | 'requester' | 'orderHistories' | 'uploads' | 'room' | 'roomRequest'>;
type TransferOrderInput = Pick<Order, 'id'>;


interface OrdersProviderProps {
    children: ReactNode;
}

interface OrdersContextData {
    orders: Order[];
    createOrder: (order: OrderInput) => Promise<void>;
    transferOrder: (order: TransferOrderInput) => Promise<void>;
    removeOrder: (orderId: string) => void;
    editOrder: (order: OrderEdit) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextData>({} as OrdersContextData);

export function OrdersProvider({children}: OrdersProviderProps) {
    const { user } = useAuth()
    const { createHistory } = useHistory()
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        api.get('orders')
        .then(response => setOrders(response.data))
    }, []);

    const createOrder = async(orderInput: OrderInput) => {
     const response = await api.post('/orders', {
         ...orderInput,
     })
          
     const order = response.data;

     await createHistory({
       message: `Solicitação criada por ${user.name}`,
       order_id: order.id,
       user_id: user.id
     })

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

            await createHistory({
              message: `Solicitação excluida por ${user.name}`,
              order_id: orderId,
              user_id: user.id
            })

            setOrders([...orders]);
          } else {
            throw Error();
          }
        } catch {
          alert('Erro na remoção da ordem');
        }
    };


    const editOrder = async (order: OrderEdit) => {
      try {
        const orderUpdated = await api.put(
          `/orders/${order.id}`,
          { ...order },
        );
  
        const ordersUpdated = orders.map(order =>
          order.id !== orderUpdated.data.id ? order : orderUpdated.data,
        );

        await createHistory({
          message: `Solicitação editada por ${user.name}`,
          order_id: order.id,
          user_id: user.id
        })
    
  
        setOrders(ordersUpdated);
      } catch (err) {

      }
    }

    const transferOrder = async (order: TransferOrderInput) => {
      try {
        const orderUpdated = await api.patch(
          `/orders/${order.id}`, { ...order },
        );
  
        const ordersUpdated = orders.map(order =>
          order.id !== orderUpdated.data.id ? order : orderUpdated.data,
        );

        const getRoom = await api.get(`/orders/${order.id}`)

        const room = getRoom.data.room;

        await api.post('/orders/history/', {
          message: `Prontuário transferido para ${room} por ${user.name}`,
          order_id: order.id,
          user_id: user.id
        })
    
  
        setOrders(ordersUpdated);
      } catch (err) {

      }
    }


    return (
        <OrdersContext.Provider value={{ orders, createOrder, removeOrder, editOrder, transferOrder }}>
            {children}
        </OrdersContext.Provider>
    );
}

export function useOrder() {
    const context = useContext(OrdersContext);

    return context;
};
