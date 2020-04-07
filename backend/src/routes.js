import { Router } from 'express';
import EventoController from './controllers/EventoController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ server_status: 'ok' });
});

routes.get('/evento', EventoController.lista);
routes.get('/evento/:id', EventoController.busca);
routes.post('/evento', EventoController.insere);
routes.put('/evento/:id', EventoController.altera);
routes.delete('/evento/:id', EventoController.deleta);

export default routes;
