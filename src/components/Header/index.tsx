import { Content } from '../styles'

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {

    return (
            <Content>
                <button type="button" onClick={onOpenNewTransactionModal}>Solicitar Internação</button>
            </Content>
    )
}