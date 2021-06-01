import Chance from 'chance';
import { CreateClientRepository } from 'src/data/protocols/client/create-client-repository';
import { ClientModel } from 'src/domain/models/client';
import { CreateClientData } from 'src/domain/usecases/create-client';
import { CreateClientUseCase } from './create-client';

const chance = new Chance();

const makeCreateClientRepository = () => {
  class CreateClientUseRepoStub implements CreateClientRepository {
    insert = async (clientData: CreateClientData): Promise<ClientModel> => ({ ...clientData, id: 1 });
  }
  return new CreateClientUseRepoStub();
};

const makeSut = () => {
  const createClientRepoStub = makeCreateClientRepository();
  const sut = new CreateClientUseCase(createClientRepoStub);

  return sut;
};

describe('Create Client usecase', () => {
  it('Should create a new client', async () => {
    const clientData = {
      name: chance.name(),
      email: chance.email(),
    };

    const createClient = makeSut();
    const client = await createClient.create(clientData);

    expect(client).toEqual(expect.objectContaining({ ...clientData, id: expect.any(Number) }));
  });
});
