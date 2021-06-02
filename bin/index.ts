import logger from '../src/utils/logger';
import App from '../src/main';

const { PORT } = process.env;

(async () => {
  try {
    const app = await App.init();
    const port = PORT || 3000;

    // start the express server
    app.listen(port, () => {
      logger.info(`server started at http://localhost:${port}`);
    });
  } catch (err) {
    logger.error('Server not started!!!');
  }
})();
