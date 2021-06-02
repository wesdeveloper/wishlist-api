import express, { Application, Express } from 'express';
import morgan from 'morgan';
import logger from '../utils/logger';
import { clientRoutes } from './routes';
import database from '../infra/db/mysql/db';

class App {
  private app: Express = express();

  private setupExpress(): void {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded());
  }

  private loadRoutes(): void {
    clientRoutes.loadRoutes(this.app);
  }

  async init(): Promise<Application> {
    logger.info('init application started!');
    this.setupExpress();
    this.loadRoutes();

    try {
      await database.checkConnection();
      logger.info('init application finished!');
      return this.app;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

export default new App();
