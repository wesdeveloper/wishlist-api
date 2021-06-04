import { UpdateClientController } from '../../presentation/controllers/update-client-controller';
import { FetchClientByIdController } from '../../presentation/controllers/fetch-client-by-id';
import { FetchClientController } from '../../presentation/controllers/fetch-client-controller';
import database from '../../infra/db/mysql/db';
import {
  CreateClientUseCase, FetchClientUseCase, FetchClientByIdUseCase, UpdateClientUseCase, RemoveClientUseCase,
} from '../../data/usecases';
import { ClientRepository } from '../../infra/db/mysql/client-repository/client-repository';
import { CreateClientController } from '../../presentation/controllers';
import { RemoveClientController } from '../../presentation/controllers/remove-client-controller';

const dbConnection = database.getConnection();
const clientRepository = new ClientRepository(dbConnection);
const fetchClient = new FetchClientUseCase(clientRepository);

export const makeCreateClientController = (): CreateClientController => {
  const createClient = new CreateClientUseCase(clientRepository, fetchClient);
  const createClientController = new CreateClientController(createClient);

  return createClientController;
};

export const makeFetchClientController = (): FetchClientController => {
  const fetchClientController = new FetchClientController(fetchClient);

  return fetchClientController;
};

export const makeFetchClientByIdController = (): FetchClientByIdController => {
  const fetchClientById = new FetchClientByIdUseCase(clientRepository);
  const fetchClientByIdController = new FetchClientByIdController(fetchClientById);

  return fetchClientByIdController;
};

export const makeUpdateClientController = (): UpdateClientController => {
  const updateClient = new UpdateClientUseCase(clientRepository);
  const updateClientController = new UpdateClientController(updateClient);

  return updateClientController;
};

export const makeRemoveClientController = (): RemoveClientController => {
  const removeClient = new RemoveClientUseCase(clientRepository);
  const removeClientController = new RemoveClientController(removeClient);

  return removeClientController;
};
