import { Container } from './styles'
import React from 'react'

export function Summary() {
    return (
        <Container>
            <div>
                <header>
                    <p>Eletivas</p>
                    <img src="TESTE" alt="Eletivas" />
                </header>
                <strong>10</strong>
            </div>
            <div>
                <header>
                    <p>Urgentes</p>
                    <img src="teste"  alt="Urgentes" />
                </header>
                <strong>5</strong>
            </div>
        </Container>
    )
}