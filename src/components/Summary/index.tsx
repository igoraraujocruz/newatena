import { useOrder } from '../../hooks/useOrder';
import {Container} from './styles';
import Button from '../Button';
import * as FaIcons from 'react-icons/fa';

interface SummaryProps {
    onOpenNewTransactionModal: () => void;
}

export function Summary({onOpenNewTransactionModal}: SummaryProps) {
    const { orders } = useOrder();
    return (
        <Container>
            <div>
                <header>
                    <p>Clínicas</p>
                </header>
                <strong>{orders.filter(order => order.typeOfHospitalization === 'Clínica').length}</strong>
            </div>
            <div>
                <header>
                    <p>Cirúrgicas</p>
                </header>
                <strong>{orders.filter(order => order.typeOfHospitalization === 'Cirúrgica').length}</strong>
            </div>

            <Button type="submit" onClick={onOpenNewTransactionModal}>Solicitar Internação <FaIcons.FaHospital/></Button>
        </Container>    
    )
}