import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useHistory } from '../hooks/useHistory';
import { useAuth } from './useAuth';

interface UploadOrder {
    id: string,
    name: string;
    user_id: string;
    order_id: string;
    url: string;
    file: File;
    message: string;
    createdAt: string;
  }
 
type UploadInput = Omit<UploadOrder, 'id' | 'createdAt' | 'url'>;


interface UploadProviderProps {
    children: ReactNode;
}

interface UploadContextData {
    uploads: UploadOrder[];
    createUpload: (upload: UploadInput) => Promise<void>;
    GetUploadById: (order_id: string) => void;
}

const UploadContext = createContext<UploadContextData>({} as UploadContextData);


export function UploadsProvider({children}: UploadProviderProps) {
    const { user } = useAuth()
    const { createHistory } = useHistory()
    const [uploads, setUploads] = useState<UploadOrder[]>([]);



    const GetUploadById = (order_id: string) => {

        useEffect(() => {
            api.get(`/orders/upload/${order_id}`)
            .then(response => setUploads(response.data))
        }, [order_id]);
    }


    const createUpload = async(uploadInput: UploadInput) => {

        const data = new FormData();
        data.append("file", uploadInput.file)
        data.append("name", uploadInput.name)
        data.append("message", uploadInput.message)
        data.append("order_id", uploadInput.order_id)
        data.append("user_id", uploadInput.user_id)
        const response = await api.post('/orders/upload/', data)
            
        const upload = response.data; 

        await createHistory({
            message: `Solicitação criada por ${user.name}`,
            order_id: upload.order_id,
            user_id: user.id
        })

        setUploads([
            ...uploads,
            upload
        ])
  
    }



    return (
        <UploadContext.Provider value={{ uploads, createUpload, GetUploadById }}>
            {children}
        </UploadContext.Provider>
    );
}

export function useUpload() {
    const context = useContext(UploadContext);

    return context;
};
