import express, { Application, Express } from 'express';
import morgan from 'morgan';
import logger from '../utils/logger';

class App {
  private app: Express = express();

  private setupExpress(): void {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded());
  }

  async init(): Promise<Application> {
    logger.info('init application started!');
    this.setupExpress();

    try {
      logger.info('init application finished!');
      return this.app;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

export default new App();
