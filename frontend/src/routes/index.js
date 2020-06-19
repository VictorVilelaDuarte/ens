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
import GaleriaAdm from '../pages/Adm/Galeria';
import EquipeAdm from '../pages/Adm/Equipe';
import ConselheiroAdm from '../pages/Adm/Conselheiro';

import NoticiaCadastro from '../pages/Cadastro/Noticia';
import InformensCadastro from '../pages/Cadastro/Informens';
import EventoCadastro from '../pages/Cadastro/Evento';
import GaleriaCadastro from '../pages/Cadastro/Galeria';
import EquipeCadastro from '../pages/Cadastro/Equipe';
import ConselheiroCadastro from '../pages/Cadastro/Conselheiro';

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
      <Router path="/galeriaadm/:page?" component={GaleriaAdm} isPrivate />
      <Router path="/equipeadm" component={EquipeAdm} isPrivate />
      <Router path="/conselheiroadm" component={ConselheiroAdm} isPrivate />

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
      <Router
        path="/eventoCadastro/:evento?"
        component={EventoCadastro}
        isPrivate
      />
      <Router
        path="/galeriaCadastro/:galeria?"
        component={GaleriaCadastro}
        isPrivate
      />
      <Router
        path="/equipeCadastro/:equipe?"
        component={EquipeCadastro}
        isPrivate
      />
      <Router
        path="/conselheiroCadastro/:conselheiro?"
        component={ConselheiroCadastro}
        isPrivate
      />
    </Switch>
  );
}
