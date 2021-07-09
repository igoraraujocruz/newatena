import { useOrder } from '../../hooks/useOrder';
import {Container} from './styles';
import Button from '../Button';
import * as FaIcons from 'react-icons/fa';
import { useState, useEffect } from 'react';
import {api} from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

interface SummaryProps {
    onOpenNewTransactionModal: () => void;
}

interface Roles {
    name: string;
}

export function Summary({onOpenNewTransactionModal}: SummaryProps) {
    const { user } = useAuth()
    const [roles, setRole] = useState<Roles[]>([])

    useEffect(() => {
        api.get(`users/${user.id}`)
        .then(response => setRole(response.data.roles))
    }, []);

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

            {roles.map(role => role.name).includes('doctor_urgency') && <Button type="submit" onClick={onOpenNewTransactionModal}>Solicitar Internação <FaIcons.FaHospital/></Button>}
  
            
        </Container>    
    )
}