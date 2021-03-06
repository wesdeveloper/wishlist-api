import { ClientModel, FetchClientModel } from '../../../domain/models';
import { FetchClientRepository } from '../../protocols';
import { FetchClientUseCase } from './fetch-client';

export const makeFetchClientRepository = () => {
  class FetchClientUseRepoStub implements FetchClientRepository {
    fetch = async (page = 1, pageSize = 10): Promise<FetchClientModel> => {
      const fetchedClientData = {
        clients: [],
        pagination: {
          page,
          pageSize,
        },
      };

      return fetchedClientData;
    };

    fetchWithFilters = async (): Promise<ClientModel[]> => [];
  }
  return new FetchClientUseRepoStub();
};

const makeSut = () => {
  const fetchClientRepoStub = makeFetchClientRepository();
  const sut = new FetchClientUseCase(fetchClientRepoStub);

  return { sut };
};

describe('Fetch Clients usecase', () => {
  it('Should fetch clients', async () => {
    const { sut } = makeSut();
    const fetchedClientData = await sut.fetch();

    expect(fetchedClientData).toEqual(expect.objectContaining({ clients: expect.any(Array), pagination: expect.any(Object) }));
  });
});
