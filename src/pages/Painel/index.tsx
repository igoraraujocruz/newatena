import { Container } from './styles'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {api} from '../../services/api';

interface Roles {
    name: string;
}


export function Painel() {
    const { user } = useAuth()
    const [roles, setRole] = useState<Roles[]>([])

    useEffect(() => {
        api.get(`users/${user.id}`)
        .then(response => setRole(response.data.roles))
    }, []);

    //melhorar sistema de roles
    return (
        <>
            <Container>
                <h1>Painel</h1>

                <div className="blocs">

                {roles.map(role => role.name).includes('doctor_urgency') && <Link to="/urgency"><div className="urgency">
                        <p>Pronto Socorro</p>
                    </div></Link>}

                    
                    <Link to="/elective"><div className="elective">
                        <p>Internações Eletivas</p>
                    </div></Link>
                    <Link to="/cm1"><div className="cm1">
                        <p>Clínica Médica 1</p>
                    </div></Link>
                    <Link to="/cm2"><div className="cm2">
                        <p>Clínica Médica 2</p>
                    </div></Link>
                </div>
            </Container>
        </>
    )
}