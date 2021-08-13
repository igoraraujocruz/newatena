import axios from 'axios';

const token = localStorage.getItem('@Atena:token');   
export const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        authorization: `Bearer ${token}`
     }
});