import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Eventos from '../pages/Eventos';
import LoginAdm from '../pages/LoginAdm';
import Painel from '../pages/Painel';

import NoticiaAdm from '../pages/Adm/Noticia';

import NoticiaCadastro from '../pages/Cadastro/Noticia';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" component={Eventos} />
      <Route path="/loginadm" component={LoginAdm} />
      <Route path="/painel" component={Painel} />
      <Route path="/noticiaadm/:page?" component={NoticiaAdm} />
      <Route path="/noticiaCadastro/:noticia?" component={NoticiaCadastro} />
    </Switch>
  );
}
