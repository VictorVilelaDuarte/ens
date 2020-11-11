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

  const signIn = useCallback(({ idmens, password, page }) => {
    api
      .post('/session', {
        idmens,
        senha: password,
      })
      .then((res) => {
        if (res.data.new) {
          const user = res.data.data;
          history.push('/novasenha', {
            user,
          });
          return;
        }
        const { token, user } = res.data;
        if (user.Adm && page === 'adm') {
          toast.info('Login efetuado com sucesso!');
          localStorage.setItem('ensccpv:token', token);
          localStorage.setItem('ensccpv:user', JSON.stringify(user));
          setData({ token, user });
          api.defaults.headers.Authorization = `Bearer ${token}`;
          history.push('/painel');
          return;
        }
        toast.info('Login efetuado com sucesso!');
        sessionStorage.setItem('ensccpv:token', token);
        sessionStorage.setItem('ensccpv:user', JSON.stringify(user));
        api.defaults.headers.Authorization = `Bearer ${token}`;
        history.push('/quadrante');
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

  return (
    <AuthContext.Provider value={{ loggedUser: data, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
