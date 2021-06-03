import { FetchClientModel } from '../../domain/models/client';
import { FetchClient } from '../../domain/usecases/fetch-client';
import { HttpRequest, HttpResponse } from '../protocols';
import { FetchClientController } from './fetch-client-controller';

const makeFetchClientUseCase = () => {
  class FetchClientSpy implements FetchClient {
    async fetch(page = 1, pageSize = 10): Promise<FetchClientModel> {
      const fetchedClientData = {
        clients: [],
        pagination: {
          page,
          pageSize,
        },
      };
      return fetchedClientData;
    }
  }

  const fetchClientSpy = new FetchClientSpy();
  return fetchClientSpy;
};

const makeSut = () => {
  const fetchClientSpy = makeFetchClientUseCase();
  const sut = new FetchClientController(fetchClientSpy);

  return {
    sut,
    fetchClientSpy,
  };
};

describe('Fetch Client Controller', () => {
  describe('Success cases', () => {
    it('Should fetch clients', async () => {
      const { sut } = makeSut();

      const httpRequest: HttpRequest = {
        body: {},
        query: { page: 2, pageSize: 5 },
      };

      const httpResponse: HttpResponse = await sut.handle(httpRequest);
      expect(httpResponse.status).toBe(200);
      expect(httpResponse.data).toEqual(expect.objectContaining({ clients: expect.any(Array), pagination: expect.any(Object) }));
    });
  });
});
