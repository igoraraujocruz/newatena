import React, { createContext, useCallback, useState, useContext } from 'react';
import { api } from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface LogInCredentials {
    username: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: LogInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {

    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@Atena:token');
        const user = localStorage.getItem('@Atena:user');

        if (token && user) {
            return {token, user:JSON.parse(user)};
        };

        return {} as AuthState;
    });

    const signIn = useCallback(async ({username, password}) => {
        const response = await api.post('sessions', {
            username,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem('@Atena:token', token);
        localStorage.setItem('@Atena:user', JSON.stringify(user));

        setData({token, user})
    }, [])

    const signOut = useCallback(() => {
        localStorage.removeItem('@Atena:token');
        localStorage.removeItem('@Atena:user');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error ('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };