import { Router } from 'express';
import EventoController from './controllers/EventoController';
import GaleriaController from './controllers/GaleriaController';

const routes = new Router();

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

export default routes;
