import { useOrder } from '../../hooks/useOrder';
import {Container} from './styles';
import React from 'react'

export function Summary() {
    const {orders} = useOrder();
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
        </Container>    
    )
}