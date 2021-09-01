import Button from '../Button'
import {
  Nav,
  NavMenu,
  NavBtn,
} from './styles';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {api} from '../../services/api';
import Input from '../Input';

interface Roles {
  name: string;
}

const Navbar = () => {

  const { user, signOut } = useAuth()
    const [roles, setRole] = useState<Roles[]>([])
    const urgency = ['superintendent', 'doctor_urgency', 'assistant_urgency', 'analyst_urgency', 'coordinator_urgency', 'manager_urgency']
    const elective = ['superintendent', 'doctor_elective', 'assistant_elective', 'analyst_elective', 'coordinator_elective', 'manager_elective']
    const utip = ['superintendent', 'doctor_utip', 'assistant_utip', 'analyst_utip', 'coordinator_utip', 'manager_utip']
    const utic = ['superintendent', 'doctor_utic', 'assistant_utic', 'analyst_utic', 'coordinator_utic', 'manager_utic']
    const utig = ['superintendent', 'doctor_utig', 'assistant_utig', 'analyst_utig', 'coordinator_utig', 'manager_utig']
    const ped = ['superintendent', 'doctor_ped', 'assistant_ped', 'analyst_ped', 'coordinator_ped', 'manager_ped']
    const cm1 = ['superintendent', 'doctor_cm1', 'assistant_cm1', 'analyst_cm1', 'coordinator_cm1', 'manager_cm1']
    const cm2 = ['superintendent', 'doctor_cm2', 'assistant_cm2', 'analyst_cm2', 'coordinator_cm2', 'manager_cm2']
    const cm3 = ['superintendent', 'doctor_cm3', 'assistant_cm3', 'analyst_cm3', 'coordinator_cm3', 'manager_cm3']
    const card = ['superintendent', 'doctor_card', 'assistant_card', 'analyst_card', 'coordinator_card', 'manager_card']
    const cc = ['superintendent', 'doctor_cc', 'assistant_cc', 'analyst_cc', 'coordinator_cc', 'manager_cc']
    const uadc = ['superintendent', 'doctor_uadc', 'assistant_uadc', 'analyst_uadc', 'coordinator_uadc', 'manager_uadc']
    const onco = ['superintendent', 'doctor_onco', 'assistant_onco', 'analyst_onco', 'coordinator_onco', 'manager_onco']

    useEffect(() => {
      api.get(`users/${user.id}`)
      .then(response => setRole(response.data.roles))
  }, []);

  return (
    <>
      <Nav>
        <NavMenu>

        {roles.map(role => role.name).some(item => urgency.includes(item)) && <Link to="/urgency"><div>
                        <p>Pronto Socorro</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => elective.includes(item)) && <Link to="/elective"><div>
                    <p>Internação Eletiva</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => utip.includes(item)) && <Link to="/utip"><div>
                        <p>Utip</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => utic.includes(item)) && <Link to="/utic"><div>
                        <p>Utic</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => utig.includes(item)) && <Link to="/utig"><div>
                        <p>Utig</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => ped.includes(item)) && <Link to="/ped"><div>
                        <p>Utip</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => cm1.includes(item)) && <Link to="/cm1"><div>
                        <p>Cm1</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => cm2.includes(item)) && <Link to="/cm2"><div>
                        <p>Cm2</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => cm3.includes(item)) && <Link to="/cm3"><div>
                        <p>Cm3</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => card.includes(item)) && <Link to="/card"><div>
                        <p>Card</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => cc.includes(item)) && <Link to="/cc"><div>
                        <p>Card</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => uadc.includes(item)) && <Link to="/uadc"><div>
                        <p>Uadc</p>
                </div></Link>}

                {roles.map(role => role.name).some(item => onco.includes(item)) && <Link to="/onco"><div>
                        <p>Onco</p>
                </div></Link>}
          
        </NavMenu>
        <NavBtn>
          <Button onClick={signOut}>Sair</Button>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;