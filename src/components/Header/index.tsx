import { Container, Content } from '../styles'

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {

    return (
        <Container>
            <Content>
                <img src="{logoImg}" alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>Solicitar Internação</button>
            </Content>
        </Container>
    )
}