import * as ROLES from '../constants/roles';
import * as ROUTES from '../constants/routes';

export default function resolveUser(user){
    if(user.role==ROLES.RIDER_ROLE){
        console.log('role: ',user.role)
        return '/rider/home'
    }
    else if(user.role==ROLES.DRIVER_ROLE){
        console.log('role: ',user.role)
        return '/driver/home'
    }
    console.log('role: ',user.role);
    return ROUTES.ROOT
}
