import Chance from 'chance';
import { ClientModel } from 'src/domain/models';
import { CreateClient, CreateClientData } from 'src/domain/usecases';
import { HelperValidatorErrorItem } from '../../utils/validator';
import { HttpRequest, HttpResponse } from '../protocols';
import { CreateClientController } from './create-client-controller';

const chance = new Chance();

const makeCreateClientUseCase = () => {
  class CreateClientSpy implements CreateClient {
    async create(client: CreateClientData): Promise<ClientModel> {
      return { ...client, id: 1 };
    }
  }

  const createClientSpy = new CreateClientSpy();
  return createClientSpy;
};
const makeSut = () => {
  const createClientSpy = makeCreateClientUseCase();
  const sut = new CreateClientController(createClientSpy);

  return {
    sut,
    createClientSpy,
  };
};

const makeClientData = () => {
  const client = {
    name: chance.name(),
    email: chance.email(),
  };

  return client;
};

describe('Create Client Controller', () => {
  describe('Success cases', () => {
    it('Should create a client', async () => {
      const clientData = makeClientData();

      const { sut } = makeSut();

      const httpRequest: HttpRequest = {
        body: clientData,
        query: {},
      };
      const httpResponse: HttpResponse = await sut.handle(httpRequest);
      expect(httpResponse.status).toBe(201);
      expect(httpResponse.data).toEqual(expect.objectContaining({ ...clientData, id: expect.any(Number) }));
    });
  });

  describe('Error cases', () => {
    describe('Bad request', () => {
      const { sut } = makeSut();
      const clientData = makeClientData();

      const clientKeysValidation = ['name', 'email'];

      clientKeysValidation.forEach((clientKey) => {
        const clientWithoutKey: any = { ...clientData };
        delete clientWithoutKey[clientKey];

        it(`Should create a client without ${clientKey} and receive bad request error`, async () => {
          const httpRequest: HttpRequest = {
            body: clientWithoutKey,
            query: {},
          };
          const httpResponse: HttpResponse = await sut.handle(httpRequest);

          expect(httpResponse.status).toBe(400);

          const errorItem: HelperValidatorErrorItem = httpResponse.data?.errors?.find((error: HelperValidatorErrorItem) => error.path === clientKey);
          expect(errorItem).not.toBeNull();
        });
      });
    });

    describe('Internal server error', () => {
      it('Should create a client and receive internal server error', async () => {
        const clientData = makeClientData();

        const { sut, createClientSpy } = makeSut();
        jest.spyOn(createClientSpy, 'create').mockImplementationOnce(async () => {
          throw new Error();
        });

        const httpRequest: HttpRequest = {
          body: clientData,
          query: {},
        };
        const httpResponse: HttpResponse = await sut.handle(httpRequest);
        expect(httpResponse.status).toBe(500);
      });
    });
  });
});
