import { Content } from '../styles'
import * as FaIcons from 'react-icons/fa';
import {Navbar} from '../Navebar'

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {

    return (
        <>
            <Navbar />
            <Content>
                
                <div className="btnRequestOrder"  onClick={onOpenNewTransactionModal}>
                    <p>Solicitar Internação<FaIcons.FaRegHospital /></p>     
                </div>
            </Content>
        </>    
    )
}