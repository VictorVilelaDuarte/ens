import { Router } from 'express';
import bd from '../config/database';

const routes = new Router();

routes.get('/', (req, res) => {
  bd.query('SELECT * FROM ens_evento', (err, result) => {
    if (err) {
      return res.json({ errror: 'Não foi possível buscar as informações' });
    }
    return res.json({ message: result });
  });
});

export default routes;
