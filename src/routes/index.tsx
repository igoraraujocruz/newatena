import { Switch } from 'react-router-dom';
import {Urgency} from '../pages/Urgency';
import {SignIn} from '../pages/SignIn';
import {Painel} from '../pages/Painel';
import { Route } from './Route'

export function Routes() {
    return (
        <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/urgency" component={Urgency} isPrivate />
            <Route path="/" component={Painel} isPrivate />
        </Switch>
    )
}