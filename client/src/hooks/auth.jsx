import React, { createContext, useContext, useState, useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_OBSERVER, LOGIN_USER, LOGOFF_OBSERVER } from '../graphql';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [errors, setErrors] = useState({});
  const [entity, setEntity] = useState(() => {
    const token = localStorage.getItem('@FunChat:token')
    if (token) {
      const decodedToken = jwtDecode(token)
      return decodedToken;
    }
    return null;
  });

  const [loginObserver, { loading: loadingObserver }] = useLazyQuery(
    LOGIN_OBSERVER,
    {
      onError: err => setErrors(err.graphQLErrors[0].extensions.errors),
      onCompleted(data) {
        const token = data.observerLogin.token;
        localStorage.setItem('@FunChat:token', token);
        setEntity(jwtDecode(token));
      },
    },
  );

  const [loginUser, { loading: loadingUser }] = useLazyQuery(LOGIN_USER, {
    onError: err => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      const token = data.login.token;
      localStorage.setItem('@FunChat:token', token);
      setEntity(jwtDecode(token));
    },
  });

  const [logoffObserver] = useLazyQuery(LOGOFF_OBSERVER, {
    onError: (err) => console.log(`err ${JSON.stringify(err)}`),
    onCompleted(data) {
      console.log('Deslogado!');
    },
  });

  const logoff = useCallback(() => {
    localStorage.removeItem('@FunChat:token');
    if (entity.type === "observer") logoffObserver({ variables: { observerName: entity.name } });
    setEntity(null);
  }, [entity])

  return (
    <AuthContext.Provider value={{
      entity,
      errors,
      loginObserver,
      loadingObserver,
      loginUser,
      loadingUser,
      logoff
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth }