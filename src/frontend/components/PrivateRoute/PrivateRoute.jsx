import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import auth from '../../util/auth';

const PrivateRoute = ({ children, ...rest }) => (
    <Route
        {...rest}
        render={({ location }) => (auth.isAuthenticated() ? (
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

export default PrivateRoute;
