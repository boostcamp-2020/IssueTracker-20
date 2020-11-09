import { useAuthState } from '@Components/ProvideAuth';

import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuthState();

  return (
    <Route
      {...rest}
      render={({ location }) => (auth.session ? (
        children
      ) : (
        <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
        />
      ))
      }
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

export default PrivateRoute;
