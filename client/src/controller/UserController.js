import * as ROLES from '../constants/roles';
import * as ROUTES from '../constants/routes';

export default function resolveUser(user,browserHistory){
    if(user.role==ROLES.RIDER_ROLE){
        browserHistory.push(ROUTES.RIDER_HOME)
        return
    }
    else if(user.role==ROLES.DRIVER_ROLE){
        browserHistory.push(ROUTES.DRIVER_HOME)
        return
    }
    browserHistory.push(ROUTES.ROOT);
}
