import Chance from 'chance';
import { ClientModel } from '../../../domain/models';
import { FetchClientByIdRepository } from '../../protocols';
import { FetchClientByIdUseCase } from './fetch-clien-by-id';

const chance = new Chance();

const makeClientData = () => {
  const client = {
    name: chance.name(),
    email: chance.email(),
  };

  return client;
};

const makeFetchClientByIdRepository = () => {
  class FetchClientByIdRepoStub implements FetchClientByIdRepository {
    fetchById = async (clientId: number): Promise<ClientModel | undefined> => ({
      id: clientId,
      ...makeClientData(),
    });
  }
  return new FetchClientByIdRepoStub();
};

const makeSut = () => {
  const fetchClientRepoStub = makeFetchClientByIdRepository();
  const sut = new FetchClientByIdUseCase(fetchClientRepoStub);

  return { sut };
};

describe('Fetch Client by id usecase', () => {
  it('Should fetch client by id', async () => {
    const { sut } = makeSut();

    const client: ClientModel = {
      id: chance.integer(),
      ...makeClientData(),
    };

    const fetchedClientData = await sut.fetchById(client.id);

    expect(fetchedClientData?.id).toEqual(client.id);
  });
});
