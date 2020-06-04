import React from 'react';
import { Switch } from 'react-router-dom';

import Router from './Router';

import Home from '../pages/Home';
import Eventos from '../pages/Eventos';
import LoginAdm from '../pages/LoginAdm';
import Painel from '../pages/Painel';

import NoticiaAdm from '../pages/Adm/Noticia';
import InformensAdm from '../pages/Adm/Informens';
import EventoAdm from '../pages/Adm/Eventos';

import NoticiaCadastro from '../pages/Cadastro/Noticia';
import InformensCadastro from '../pages/Cadastro/Informens';

export default function Routes() {
  return (
    <Switch>
      <Router path="/" exact component={Home} />
      <Router path="/register" component={Eventos} />
      <Router path="/loginadm" component={LoginAdm} />
      <Router path="/painel" component={Painel} isPrivate />

      <Router path="/noticiaadm/:page?" component={NoticiaAdm} isPrivate />
      <Router path="/informensadm/:page?" component={InformensAdm} isPrivate />
      <Router path="/eventoadm/:page?" component={EventoAdm} isPrivate />

      <Router
        path="/noticiaCadastro/:noticia?"
        component={NoticiaCadastro}
        isPrivate
      />
      <Router
        path="/informensCadastro/"
        component={InformensCadastro}
        isPrivate
      />
    </Switch>
  );
}
