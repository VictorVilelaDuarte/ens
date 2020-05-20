import React, { createContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

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
        toast.success('Login efetuado com sucesso!');
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

  return (
    <AuthContext.Provider value={{ loggedUser: data, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
