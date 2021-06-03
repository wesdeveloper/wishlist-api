import { Router } from 'express';
import { expressRouterAdapter } from '../adapters/express-route-adapter';
import { makeCreateClientController, makeFetchClientByIdController, makeFetchClientController } from '../factories/client';
import BaseRoutes from './protocols/base-routes';

class ClientRoutes extends BaseRoutes {
  loadRoutes(router: Router) {
    const createClientController = makeCreateClientController();
    const fetchClientController = makeFetchClientController();
    const fetchClientByIdController = makeFetchClientByIdController();

    router
      .post('/client', expressRouterAdapter(createClientController))
      .get('/client', expressRouterAdapter(fetchClientController))
      .get('/client/:clientId', expressRouterAdapter(fetchClientByIdController));
  }
}

export default new ClientRoutes();
