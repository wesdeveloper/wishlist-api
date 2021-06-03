import { Router } from 'express';
import { expressRouterAdapter } from '../adapters/express-route-adapter';
import {
  makeCreateClientController,
  makeFetchClientByIdController,
  makeFetchClientController,
  makeRemoveClientController,
  makeUpdateClientController,
} from '../factories/client';
import BaseRoutes from './protocols/base-routes';

class ClientRoutes extends BaseRoutes {
  loadRoutes(router: Router) {
    const createClientController = makeCreateClientController();
    const fetchClientController = makeFetchClientController();
    const fetchClientByIdController = makeFetchClientByIdController();
    const updateClientController = makeUpdateClientController();
    const removeClientController = makeRemoveClientController();

    router
      .get('/client/:clientId', expressRouterAdapter(fetchClientByIdController))
      .patch('/client/:clientId', expressRouterAdapter(updateClientController))
      .delete('/client/:clientId', expressRouterAdapter(removeClientController))
      .get('/client', expressRouterAdapter(fetchClientController))
      .post('/client', expressRouterAdapter(createClientController));
  }
}

export default new ClientRoutes();
