import { useOrder } from '../../hooks/useOrder';
import {Container} from './styles';
import Button from '../Button';
import * as FaIcons from 'react-icons/fa';
import { useState, useEffect } from 'react';
import {api} from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

interface SummaryProps {
    onOpenNewOrderModal: () => void;
}

interface Roles {
    name: string;
}

export function Summary({onOpenNewOrderModal}: SummaryProps) {
    const { user } = useAuth()
    const [roles, setRole] = useState<Roles[]>([])

    useEffect(() => {
        api.get(`users/${user.id}`)
        .then(response => setRole(response.data.roles))
    }, [user.id]);

    const { orders } = useOrder();
    return (
        <Container>
            <div>
                <header>
                    <p>Clínicas</p>
                </header>
                <strong>{orders.filter(order => order?.typeOfHospitalization === 'Clínica' && order.room === null).length}</strong>
            </div>
            <div>
                <header>
                    <p>Cirúrgicas</p>
                </header>
                <strong>{orders.filter(order => order?.typeOfHospitalization === 'Cirúrgica' && order.room === null ).length}</strong>
            </div>
            <div>
                <header>
                    <p>Oncológica</p>
                </header>
                <strong>{orders.filter(order => order?.typeOfHospitalization === 'Oncológica' && order.room === null).length}</strong>
            </div>
            <div>
                <header>
                    <p>UTIP</p>
                </header>
                <strong>{orders.filter(order => order?.typeOfHospitalization === 'UTIP' && order.room === null).length}</strong>
            </div>
            <div>
                <header>
                    <p>UTIG</p>
                </header>
                <strong>{orders.filter(order => order?.typeOfHospitalization === 'UTIG' && order.room === null).length}</strong>
            </div>
            <div>
                <header>
                    <p>UCO</p>
                </header>
                <strong>{orders.filter(order => order?.typeOfHospitalization === 'UCO' && order.room === null).length}</strong>
            </div>
            <div>
                <header>
                    <p>Covid</p>
                </header>
                <strong>{orders.filter(order => order?.typeOfHospitalization === 'Covid' && order.room === null).length}</strong>
            </div>

            {roles.map(role => role.name).includes('doctor_urgency') && <Button type="submit" onClick={onOpenNewOrderModal}>Solicitar Internação <FaIcons.FaHospital/></Button>}
  
            
        </Container>    
    )
}