import { GlobalStyle } from './styles/global';
import { OrdersProvider } from './hooks/useOrder'
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'react-modal';
import {AuthProvider} from './hooks/useAuth'
import {ToastProvider} from './hooks/useToast'
import {Routes} from './routes';

Modal.setAppElement('#root');

export function App() {
  
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <OrdersProvider>
            <Routes />
            <GlobalStyle />
          </OrdersProvider>
        </Router>  
      </AuthProvider>
    </ToastProvider>
  );
}