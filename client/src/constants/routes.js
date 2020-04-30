
import * as ROLES from './roles';

export const ROOT = '/';
export const REGISTER = '/register';
export const LOG_IN = '/login';
export const PASSWORD_FORGET = '/pw-forget';
const HOME='home'
const TRANSIT ='transit'
const PATH_CONCAT='/'
// RIDER
//makes prefix: /rider/home -- which needs to be used for all routes pertaining to rider.

export const RIDER_HOME = PATH_CONCAT + ROLES.RIDER_ROLE + PATH_CONCAT + HOME

export const RIDER_TRANSIT = PATH_CONCAT + ROLES.RIDER_ROLE + PATH_CONCAT + TRANSIT


// DRIVER Constants
//makes prefix: /driver/home -- which needs to be used for all routes pertaining to driver.
export const DRIVER_HOME = PATH_CONCAT + ROLES.DRIVER_ROLE + PATH_CONCAT + HOME
export const DRIVER_TRANSIT = PATH_CONCAT + ROLES.DRIVER_ROLE + PATH_CONCAT + TRANSIT
