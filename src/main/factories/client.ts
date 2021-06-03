import { FetchClientByIdController } from '../../presentation/controllers/fetch-client-by-id';
import { FetchClientController } from '../../presentation/controllers/fetch-client-controller';
import database from '../../infra/db/mysql/db';
import { CreateClientUseCase, FetchClientUseCase, FetchClientByIdUseCase } from '../../data/usecases';
import { ClientRepository } from '../../infra/db/mysql/client-repository/client-repository';
import { CreateClientController } from '../../presentation/controllers';

const dbConnection = database.getConnection();
const clientRepository = new ClientRepository(dbConnection);

export const makeCreateClientController = (): CreateClientController => {
  const createClient = new CreateClientUseCase(clientRepository);
  const createClientController = new CreateClientController(createClient);

  return createClientController;
};

export const makeFetchClientController = (): FetchClientController => {
  const fetchClient = new FetchClientUseCase(clientRepository);
  const fetchClientController = new FetchClientController(fetchClient);

  return fetchClientController;
};

export const makeFetchClientByIdController = (): FetchClientByIdController => {
  const fetchClientById = new FetchClientByIdUseCase(clientRepository);
  const fetchClientByIdController = new FetchClientByIdController(fetchClientById);

  return fetchClientByIdController;
};
