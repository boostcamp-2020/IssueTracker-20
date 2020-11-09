import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import fetchProfile from '@Util/fetchProfile';

// TODO: default profile을 어떻게 할것인지 정하기
export const initialAuth = {
  session: false,
  id: null,
  username: 'anonymous',
  profilePictureURL: 'https://http.cat/403',
};

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();
const ProvideAuth = ({ children }) => {
  const [auth, setAuth] = useState(initialAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      fetchProfile()
        .then((profile) => {
          setAuth({
            ...auth,
            ...profile,
          });
          setLoading(false);
        });
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <AuthStateContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={() => setLoading(true)}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

ProvideAuth.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export default ProvideAuth;
