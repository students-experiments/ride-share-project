
import * as ROLES from './roles';

export const ROOT = '/';
export const REGISTER = '/register';
export const LOG_IN = '/login';
export const PASSWORD_FORGET = '/pw-forget';
const PATH_CONCAT='/'
// RIDER
//makes prefix: /rider/ -- which needs to be used for all routes pertaining to rider.

export const RIDER_HOME=PATH_CONCAT + ROLES.RIDER_ROLE;


// DRIVER Constants
//makes prefix: /driver/ -- which needs to be used for all routes pertaining to driver.
export const DRIVER_HOME=PATH_CONCAT + ROLES.DRIVER_ROLE;
