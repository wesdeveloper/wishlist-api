import { FetchClientController } from '../../presentation/controllers/fetch-client-controller';
import database from '../../infra/db/mysql/db';
import { CreateClientUseCase, FetchClientUseCase } from '../../data/usecases';
import { ClientRepository } from '../../infra/db/mysql/client-repository/client-repository';
import { CreateClientController } from '../../presentation/controllers';

const dbConnection = database.getConnection();

export const makeCreateClientController = (): CreateClientController => {
  const createClientRepository = new ClientRepository(dbConnection);
  const createClient = new CreateClientUseCase(createClientRepository);
  const createClientController = new CreateClientController(createClient);

  return createClientController;
};

export const makeFetchClientController = (): FetchClientController => {
  const fetchClientRepository = new ClientRepository(dbConnection);
  const fetchClient = new FetchClientUseCase(fetchClientRepository);
  const fetchClientController = new FetchClientController(fetchClient);

  return fetchClientController;
};
