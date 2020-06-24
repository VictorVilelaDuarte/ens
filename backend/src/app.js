import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    const corsOptions = {
      exposedHeaders: ['prevPage', 'page', 'nextPage', 'lastPage'],
    };

    this.server.use(express.json());
    this.server.use(cors(corsOptions));
    this.server.use(
      '/files-capa',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'capa'))
    );
    this.server.use(
      '/files-galeria',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'galeria'))
    );
    this.server.use(
      '/files-informens',
      express.static(
        path.resolve(__dirname, '..', 'tmp', 'uploads', 'informens')
      )
    );
    this.server.use(
      '/files-oracao',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'oracao'))
    );
    this.server.use(
      '/files-noticia',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'noticia'))
    );
    this.server.use(
      '/files-equipe',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'equipe'))
    );
    this.server.use(
      '/files-conselheiro',
      express.static(
        path.resolve(__dirname, '..', 'tmp', 'uploads', 'conselheiro')
      )
    );
    this.server.use(
      '/files-arquivo',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'arquivo'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
