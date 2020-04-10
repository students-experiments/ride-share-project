
import * as ROLES from './roles';

export const LANDING = '/';
const REGISTER = 'register';
const LOG_IN = 'login/';
const HOME = 'home';
export const PASSWORD_FORGET = '/pw-forget';
const PATH_CONCAT='/'
// RIDER
//makes prefix: /rider/ -- which needs to be used for all routes pertaining to rider.
const RIDER_PREFIX=PATH_CONCAT + ROLES.RIDER_ROLE + PATH_CONCAT ;
export const RIDER_REGISTER = RIDER_PREFIX + REGISTER ;
export const RIDER_LOG_IN =  RIDER_PREFIX + LOG_IN ;


// DRIVER Constants
//makes prefix: /driver/ -- which needs to be used for all routes pertaining to driver.
const DRIVER_PREFIX=PATH_CONCAT + ROLES.DRIVER_ROLE + PATH_CONCAT ;
export const DRIVER_REGISTER = DRIVER_PREFIX+ REGISTER ;
export const DRIVER_LOG_IN = DRIVER_PREFIX+ LOG_IN ;
