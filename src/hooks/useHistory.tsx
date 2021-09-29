import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';


interface IOrderHistory {
    id: string,
    message: string;
    order_id: string;
    user_id: string;
    createdAt: string; 
}
  
 
type HistoryInput = Omit<IOrderHistory, 'id' | 'createdAt'>;


interface HistoryProviderProps {
    children: ReactNode;
}

interface HistoryContextData {
    histories: IOrderHistory[];
    createHistory: (history: HistoryInput) => Promise<void>;
    GetOrderById: (order_id: string) => void;
}

const HistoryContext = createContext<HistoryContextData>({} as HistoryContextData);

export function HistoriesProvider({children}: HistoryProviderProps) {
    const [histories, setHistories] = useState<IOrderHistory[]>([]);

    const GetOrderById = (order_id: string) => {

        useEffect(() => {
            api.get(`/orders/history/${order_id}`)
            .then(response => setHistories(response.data))
        }, [order_id]);
    }


    const createHistory = async(historyInput: HistoryInput) => {
     const response = await api.post('/orders/history/', {
         ...historyInput
     })
          
     const history = response.data;

     setHistories([
         ...histories,
         history
     ])
    
    }


    return (
        <HistoryContext.Provider value={{ histories, createHistory, GetOrderById }}>
            {children}
        </HistoryContext.Provider>
    );
}

export function useHistory() {
    const context = useContext(HistoryContext);

    return context;
};
