import { Router } from 'express';
import { expressRouterAdapter } from '../adapters/express-route-adapter';
import { makeCreateClientController } from '../factories/client';
import BaseRoutes from './protocols/base-routes';

class ClientRoutes extends BaseRoutes {
  loadRoutes(router: Router) {
    const createClientController = makeCreateClientController();
    router.post('/client', expressRouterAdapter(createClientController));
  }
}

export default new ClientRoutes();
