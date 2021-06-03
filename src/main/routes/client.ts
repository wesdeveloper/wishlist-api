import { Router } from 'express';
import { expressRouterAdapter } from '../adapters/express-route-adapter';
import { makeCreateClientController, makeFetchClientController } from '../factories/client';
import BaseRoutes from './protocols/base-routes';

class ClientRoutes extends BaseRoutes {
  loadRoutes(router: Router) {
    const createClientController = makeCreateClientController();
    const fetchClientController = makeFetchClientController();

    router
      .post('/client', expressRouterAdapter(createClientController))
      .get('/client', expressRouterAdapter(fetchClientController));
  }
}

export default new ClientRoutes();
