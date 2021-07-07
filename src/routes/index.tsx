import { Switch } from 'react-router-dom';
import {Urgency} from '../pages/Urgency';
import {SignIn} from '../pages/SignIn';
import { Route } from './Route'

export function Routes() {
    return (
        <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/urgency" component={Urgency} isPrivate />
        </Switch>
    )
}