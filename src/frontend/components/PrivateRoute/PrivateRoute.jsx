import { useAuthState, useAuthDispatch } from '@Components/ProvideAuth';

import React, { useEffect, useState } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import fetchProfile from '@Util/auth';

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuthState();
  const setAuth = useAuthDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      fetchProfile()
        .then((profile) => {
          setAuth({
            ...auth,
            ...profile,
          });
          setLoading(true);
        });
    }
  }, [loading]);

  if (!loading) {
    return null;
  }

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

export default PrivateRoute;
