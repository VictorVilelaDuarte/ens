import React, { createContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

import api from '../services/api';
import history from '../services/history';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('ensccpv:token');
    const user = localStorage.getItem('ensccpv:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {};
  });

  const signIn = useCallback(({ idmens, password }) => {
    api
      .post('/session', {
        idmens,
        senha: password,
      })
      .then((res) => {
        const { token, user } = res.data;
        toast.info('Login efetuado com sucesso!');
        localStorage.setItem('ensccpv:token', token);
        localStorage.setItem('ensccpv:user', JSON.stringify(user));
        setData({ token, user });
        history.push('/painel');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('ensccpv:token');
    localStorage.removeItem('ensccpv:user');

    setData({});
  }, []);

  const verifyAuth = useCallback(
    (page) => {
      if (data.token) {
        const { exp } = jwt_decode(data.token);
        if (Date.now() >= exp * 1000) {
          signOut();
        }

        if (page === '/loginadm') {
          history.push('painel');
          return;
        }

        history.push(`${page}`);
      } else {
        history.push('/loginadm');
      }
    },
    [data]
  );

  return (
    <AuthContext.Provider
      value={{ loggedUser: data, signIn, signOut, verifyAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
