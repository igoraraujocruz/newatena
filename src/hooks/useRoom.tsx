import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import {RoomRequest} from '../interfaces/RoomRequest'
import { useEffect } from 'react'
import {Order} from '../interfaces/Order'

type RoomInput = Pick<RoomRequest, 'room' | 'message' | 'order_id'>;

interface RoomProviderProps {
    children: ReactNode;
}

interface RoomContextData {
    room: RoomRequest[];
    createRoomRequest: (room: RoomInput) => Promise<void>;
}

const RoomContext = createContext<RoomContextData>({} as RoomContextData);

export function RoomProvider({children}: RoomProviderProps) {
    const { user } = useAuth()
    const [room, setRoom] = useState<RoomRequest[]>([]);

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        api.get('orders')
        .then(response => setOrders(response.data))
    }, [setRoom]);
    
    const createRoomRequest = async(roomInput: RoomInput) => {
     const response = await api.post('/orders/roomRequests', {
        ...roomInput,
     })
          
     const roomResponse = response.data;

     await api.post('/orders/history/', {
      message: `Quarto ${roomInput.room} Solitado por ${user.name}`,
      order_id: roomResponse.order_id,
      user_id: user.id
     })

     setRoom([...room, roomResponse])
    }


    return (
        <RoomContext.Provider value={{ room, createRoomRequest }}>
            {children}
        </RoomContext.Provider>
    );
}

export function useRoomRequest() {
    const context = useContext(RoomContext);

    return context;
};
