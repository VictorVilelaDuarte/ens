import React from 'react';
import { Switch } from 'react-router-dom';

import Router from './Router';

import Home from '../pages/Home';
import Eventos from '../pages/Eventos';
import Noticias from '../pages/Noticias';
import Noticia from '../pages/Noticia';
import LoginAdm from '../pages/LoginAdm';
import Login from '../pages/Login';
import NovaSenha from '../pages/NovaSenha';
import Painel from '../pages/Painel';

import NoticiaAdm from '../pages/Adm/Noticia';
import InformensAdm from '../pages/Adm/Informens';
import EventoAdm from '../pages/Adm/Eventos';
import GaleriaAdm from '../pages/Adm/Galeria';
import EquipeAdm from '../pages/Adm/Equipe';
import ConselheiroAdm from '../pages/Adm/Conselheiro';
import PadroeiraAdm from '../pages/Adm/Padroeira';
import UsuarioAdm from '../pages/Adm/Usuario';
import QuadranteAdm from '../pages/Adm/Quadrante';
import ArquivoAdm from '../pages/Adm/Arquivo';

import NoticiaCadastro from '../pages/Cadastro/Noticia';
import InformensCadastro from '../pages/Cadastro/Informens';
import EventoCadastro from '../pages/Cadastro/Evento';
import GaleriaCadastro from '../pages/Cadastro/Galeria';
import EquipeCadastro from '../pages/Cadastro/Equipe';
import ConselheiroCadastro from '../pages/Cadastro/Conselheiro';
import PadroeiraCadastro from '../pages/Cadastro/Padroeira';
import ArquivoCadastro from '../pages/Cadastro/Arquivo';

export default function Routes() {
  return (
    <Switch>
      <Router path="/" exact component={Home} />
      <Router path="/eventos" component={Eventos} />
      <Router path="/noticias" component={Noticias} />
      <Router path="/noticia/:noticia?" component={Noticia} />
      <Router path="/loginadm" component={LoginAdm} />
      <Router path="/login" component={Login} />
      <Router path="/novasenha" component={NovaSenha} />

      <Router path="/painel" component={Painel} isPrivate />
      <Router path="/noticiaadm/:page?" component={NoticiaAdm} isPrivate />
      <Router path="/informensadm/:page?" component={InformensAdm} isPrivate />
      <Router path="/eventoadm/:page?" component={EventoAdm} isPrivate />
      <Router path="/galeriaadm/:page?" component={GaleriaAdm} isPrivate />
      <Router path="/equipeadm" component={EquipeAdm} isPrivate />
      <Router path="/conselheiroadm" component={ConselheiroAdm} isPrivate />
      <Router path="/padroeiraadm" component={PadroeiraAdm} isPrivate />
      <Router path="/padroeiraadm" component={PadroeiraAdm} isPrivate />
      <Router path="/usuarioadm" component={UsuarioAdm} isPrivate />
      <Router path="/quadranteadm" component={QuadranteAdm} isPrivate />
      <Router path="/arquivoadm" component={ArquivoAdm} isPrivate />

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
      <Router
        path="/padroeiraCadastro/:padroeira?"
        component={PadroeiraCadastro}
        isPrivate
      />

      <Router path="/arquivoCadastro" component={ArquivoCadastro} isPrivate />
    </Switch>
  );
}
