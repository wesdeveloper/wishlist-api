import database from '../../infra/db/mysql/db';
import { CreateClientUseCase } from '../../data/usecases/client/create-client';
import { ClientRepository } from '../../infra/db/mysql/client-repository/client-repository';
import { CreateClientController } from '../../presentation/controllers';

export const makeCreateClientController = (): CreateClientController => {
  const dbConnection = database.getConnection();
  const createClientRepository = new ClientRepository(dbConnection);
  const createClient = new CreateClientUseCase(createClientRepository);
  const createClientController = new CreateClientController(createClient);

  return createClientController;
};
