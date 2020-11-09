import React, {
  createContext, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

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

  return (
    <AuthStateContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={setAuth}>
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
