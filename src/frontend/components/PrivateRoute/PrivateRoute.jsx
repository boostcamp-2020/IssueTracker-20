import React, { useEffect, useState } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import auth from '@Util/auth';

const PrivateRoute = ({ children, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading === false) {
      (async function () {
        try {
          /* Update effect logic to track correct state */
          const isUserLogged = await auth.isAuthenticated();
          setAuthenticated(isUserLogged);
          setLoading(true);
        } catch (e) {
          setAuthenticated(false);
          setLoading(true);
        }
      }());
    }
  }, []);

  if (!loading) {
    return (<div></div>);
  }

  return (
  <Route
      {...rest}
      render={({ location }) => (authenticated ? (
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

export default PrivateRoute;
