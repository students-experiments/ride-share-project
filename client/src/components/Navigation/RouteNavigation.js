import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
// currently not working. Needs to be worked out.
const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.RIDER_REGISTER} className={ROUTES.RIDER_REGISTER}>Register Rider</Link>
      </li>
      <li>
        <Link to={ROUTES.RIDER_LOG_IN}>Login Rider</Link>
      </li>
      <li>
        <Link to={ROUTES.DRIVER_REGISTER}>Register Driver</Link>
      </li>
      <li>
        <Link to={ROUTES.DRIVER_LOG_IN}>Login Rider</Link>
      </li>
    </ul>
  </div>
);
export default Navigation;