import 'dotenv/config';
import express from 'express';
import path from 'path';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files-capa',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'capa'))
    );
    this.server.use(
      '/files-galeria',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'galeria'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
