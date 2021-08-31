import { Switch } from 'react-router-dom';
import {Urgency} from '../pages/Urgency';
import {CM1} from '../pages/CM1';
import {SignIn} from '../pages/SignIn';
import {Painel} from '../pages/Painel';
import { Route } from './Route'

export function Routes() {
    return (
        <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/urgency" component={Urgency} isPrivate />
            <Route path="/cm1" component={CM1} isPrivate />
            <Route path="/painel" component={Painel} isPrivate />
        </Switch>
    )
}