import Chance from 'chance';
import { ClientModel } from '../../../domain/models';
import { FetchClientById } from '../../../domain/usecases';
import { HttpRequest, HttpResponse } from '../../protocols';
import { FetchClientByIdController } from './fetch-client-by-id';

const chance = new Chance();

const makeClientData = () => {
  const client = {
    name: chance.name(),
    email: chance.email(),
  };

  return client;
};

const makeFetchClientByIdUseCase = () => {
  const clientData = makeClientData();

  class FetchClientByIdSpy implements FetchClientById {
    fetchById = async (clientId: number): Promise<ClientModel|undefined> => ({
      id: clientId,
      ...clientData,
    });
  }

  const fetchClientByIdSpy = new FetchClientByIdSpy();
  return fetchClientByIdSpy;
};
const makeSut = () => {
  const fetchClientByIdSpy = makeFetchClientByIdUseCase();
  const sut = new FetchClientByIdController(fetchClientByIdSpy);

  return {
    sut,
    fetchClientByIdSpy,
  };
};

describe('Fetch Client By Id Controller', () => {
  describe('Success cases', () => {
    it('Should fetch a client', async () => {
      const clientId = chance.integer();

      const { sut } = makeSut();

      const httpRequest: HttpRequest = {
        params: { clientId },
      };
      const httpResponse: HttpResponse = await sut.handle(httpRequest);

      expect(httpResponse.status).toBe(200);
      expect(httpResponse.data.id).toEqual(clientId);
    });
  });

  describe('Error cases', () => {
    describe('Not found error', () => {
      it('Should fetch a client by id that not exists', async () => {
        const { sut, fetchClientByIdSpy } = makeSut();
        jest.spyOn(fetchClientByIdSpy, 'fetchById').mockImplementationOnce(() => Promise.resolve(undefined));

        const httpRequest: HttpRequest = {
          params: { clientId: chance.integer() },
        };
        const httpResponse: HttpResponse = await sut.handle(httpRequest);
        expect(httpResponse.status).toBe(404);
      });
    });

    describe('Internal server error', () => {
      it('Should fetch a client by id and receive internal server error', async () => {
        const { sut, fetchClientByIdSpy } = makeSut();
        jest.spyOn(fetchClientByIdSpy, 'fetchById').mockImplementationOnce(async () => {
          throw new Error();
        });

        const httpRequest: HttpRequest = {
          params: { clientId: chance.integer() },
        };
        const httpResponse: HttpResponse = await sut.handle(httpRequest);
        expect(httpResponse.status).toBe(500);
      });
    });
  });
});
