import { GlobalStyle } from './styles/global';
import { OrdersProvider } from './hooks/useOrder'
import { HistoriesProvider } from './hooks/useHistory'
import { UploadsProvider } from './hooks/useUpload'
import { RoomProvider } from './hooks/useRoom'
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
          <HistoriesProvider>
          <UploadsProvider>
          <OrdersProvider>
            <RoomProvider>
            <Routes />
            <GlobalStyle />
            </RoomProvider>
          </OrdersProvider>
          </UploadsProvider>
          </HistoriesProvider>
        </Router>  
      </AuthProvider>
    </ToastProvider>
  );
}