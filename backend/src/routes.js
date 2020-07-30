import { Router } from 'express';
import multer from 'multer';

import authMiddleware from './middlewares/auth';

import EventoController from './controllers/EventoController';
import GaleriaController from './controllers/GaleriaController';
import CapaController from './controllers/CapaController';
import AlbumController from './controllers/AlbumController';
import InformensController from './controllers/InformensController';
import OracaoController from './controllers/OracaoController';
import UserController from './controllers/UserController';
import NoticiaController from './controllers/NoticiaController';
import SessionController from './controllers/SessionController';
import EquipeController from './controllers/EquipeController';
import PadroeiraController from './controllers/PadroeiraController';
import PaginaController from './controllers/PaginaController';
import TipoEvento from './controllers/TipoEvento';
import ConselheiroController from './controllers/ConselheiroController';
import CasalController from './controllers/CasalController';
import ArquivoController from './controllers/ArquivoController';
import PilotagemController from './controllers/PilotagemController';

import multerCapa from '../config/multerCapa';
import multerAlbum from '../config/multerAlbum';
import multerInformens from '../config/multerInformens';
import multerOracao from '../config/multerOracao';
import multerNoticia from '../config/multerNoticia';
import multerEquipe from '../config/multerEquipe';
import multerConselheiro from '../config/multerConselheiro';
import multerArquivo from '../config/multerArquivo';

const routes = new Router();
const uploadCapa = multer(multerCapa);
const uploadAlbum = multer(multerAlbum);
const uploadInformens = multer(multerInformens);
const uploadOracao = multer(multerOracao);
const uploadNoticia = multer(multerNoticia);
const uploadEquipe = multer(multerEquipe);
const uploadConselheiro = multer(multerConselheiro);
const uploadArquivo = multer(multerArquivo);

routes.get('/', (req, res) => {
  return res.json({ server_status: 'ok' });
});

routes.get('/evento', EventoController.lista);
routes.get('/eventoCompleto', EventoController.listaCompleta);
routes.get('/evento/:id', EventoController.busca);
routes.get('/eventohome', EventoController.home);
routes.post('/evento', EventoController.insere);
routes.post('/eventofiltro', EventoController.filtro);
routes.put('/evento/:id', EventoController.altera);
routes.delete('/evento/:id', EventoController.deleta);

routes.get('/galeria', GaleriaController.lista);
routes.get('/galeria/:id', GaleriaController.busca);
routes.post('/galeria', GaleriaController.insere);
routes.put('/galeria/:id', GaleriaController.altera);
routes.delete('/galeria/:id', GaleriaController.deleta);

routes.post('/capa', uploadCapa.single('file'), CapaController.insere);

routes.post('/album', uploadAlbum.array('file'), AlbumController.insere);
routes.get('/album/:id', AlbumController.busca);
routes.delete('/album/:id', AlbumController.deleta);

routes.post(
  '/informens',
  uploadInformens.single('file'),
  InformensController.insere
);
routes.delete('/informens/:id', InformensController.deleta);
routes.get('/informens', InformensController.lista);

routes.post('/arquivo', uploadArquivo.single('file'), ArquivoController.insere);
routes.delete('/arquivo/:id', ArquivoController.deleta);
routes.get('/arquivo', ArquivoController.lista);

routes.post('/oracao', uploadOracao.single('file'), OracaoController.insere);
routes.delete('/oracao/:id', OracaoController.deleta);

routes.get('/user', authMiddleware, UserController.lista);
routes.get('/user/:idmens', UserController.busca);
routes.post('/user', UserController.insere);
routes.delete('/user/:idmens', UserController.deleta);
routes.put('/user/:idmens', UserController.alteraAdm);

routes.get('/noticia', NoticiaController.lista);
routes.get('/noticia/:id', NoticiaController.busca);
routes.post(
  '/noticia',
  authMiddleware,
  uploadNoticia.single('file'),
  NoticiaController.insere
);
routes.get('/noticiahome', NoticiaController.home);
routes.post(
  '/noticia/:id',
  authMiddleware,
  uploadNoticia.single('file'),
  NoticiaController.altera
);
routes.delete('/noticia/:id', NoticiaController.deleta);

routes.get('/equipe', EquipeController.lista);
routes.post('/equipe', uploadEquipe.single('file'), EquipeController.insere);
routes.get('/equipe/:id', EquipeController.busca);
routes.post(
  '/equipe/:id',
  uploadEquipe.single('file'),
  EquipeController.altera
);
routes.delete('/equipe/:id', EquipeController.deleta);

routes.get('/padroeira', PadroeiraController.lista);
routes.post('/padroeira', PadroeiraController.insere);
routes.get('/padroeira/:id', PadroeiraController.busca);
routes.put('/padroeira/:id', PadroeiraController.altera);
routes.delete('/padroeira/:id', PadroeiraController.deleta);

routes.get('/pagina/:id', PaginaController.busca);
routes.put('/pagina/:id', PaginaController.altera);

routes.get('/conselheiro', ConselheiroController.lista);
routes.get('/conselheiro/:id', ConselheiroController.busca);
routes.post(
  '/conselheiro',
  uploadConselheiro.single('file'),
  ConselheiroController.insere
);
routes.post(
  '/conselheiro/:idmens',
  authMiddleware,
  uploadConselheiro.single('file'),
  ConselheiroController.altera
);
routes.delete('/conselheiro/:idmens', ConselheiroController.deleta);

routes.get('/tipoevento', TipoEvento.lista);

routes.post('/session', SessionController.insere);

routes.get('/casalOpcao', CasalController.listaOpcao);
routes.get('/casal/:equipe', CasalController.lista);
routes.get('/casalBusca/:idmens', CasalController.busca);
routes.put('/casal/:idmens', CasalController.altera);

routes.get('/pilotagem', PilotagemController.lista);
routes.get('/pilotagem/:idmens', PilotagemController.busca);
routes.post('/pilotagem', PilotagemController.insere);
routes.post('/pilotagemPromove', PilotagemController.promove);
routes.put('/pilotagem/:idmens', PilotagemController.altera);
routes.delete('/pilotagem/:idmens', PilotagemController.deleta);

export default routes;
