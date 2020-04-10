import { Router } from 'express';
import multer from 'multer';

import EventoController from './controllers/EventoController';
import GaleriaController from './controllers/GaleriaController';
import CapaController from './controllers/CapaController';
import AlbumController from './controllers/AlbumController';
import InformensController from './controllers/InformensController';

import multerCapa from '../config/multerCapa';
import multerAlbum from '../config/multerAlbum';
import multerInformens from '../config/multerInformens';

const routes = new Router();
const uploadCapa = multer(multerCapa);
const uploadAlbum = multer(multerAlbum);
const uploadInformens = multer(multerInformens);

routes.get('/', (req, res) => {
  return res.json({ server_status: 'ok' });
});

routes.get('/evento', EventoController.lista);
routes.get('/evento/:id', EventoController.busca);
routes.post('/evento', EventoController.insere);
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

export default routes;
