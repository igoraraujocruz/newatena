import { useOrder } from '../../hooks/useOrder';
import React from 'react'

export function Summary() {
    const {orders} = useOrder();
    return (
        <>
            <div>
                <header>
                    <p>Clínicas</p>
                    <img src="TESTE"/>
                </header>
                <strong>{orders.filter(order => order.typeOfHospitalization === 'Clínica').length}</strong>
            </div>
            <div>
                <header>
                    <p>Cirúrgicas</p>
                    <img src="teste" />
                </header>
                <strong>{orders.filter(order => order.typeOfHospitalization === 'Cirúrgica').length}</strong>
            </div>
        </>    
    )
}