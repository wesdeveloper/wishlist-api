import Chance from 'chance';
import { ClientModel } from '../../../domain/models';
import { CreateClientData } from '../../../domain/usecases';
import { CreateClientRepository } from '../../protocols';
import { CreateClientUseCase } from './create-client';
import { makeFetchClientRepository } from './fetch-client.spec';

const chance = new Chance();

const makeCreateClientRepository = () => {
  class CreateClientUseRepoStub implements CreateClientRepository {
    insert = async (clientData: CreateClientData): Promise<ClientModel> => ({ ...clientData, id: 1 });
  }
  return new CreateClientUseRepoStub();
};

const makeSut = () => {
  const createClientRepoStub = makeCreateClientRepository();
  const fetchClientRepoStub = makeFetchClientRepository();
  const sut = new CreateClientUseCase(createClientRepoStub, fetchClientRepoStub);

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
