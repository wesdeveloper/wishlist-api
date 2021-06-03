import Chance from 'chance';
import { ClientModel } from 'src/domain/models';
import { HelperValidatorErrorItem } from 'src/utils';
import { UpdateClient, UpdateClientData } from '../../domain/usecases';
import { HttpRequest, HttpResponse } from '../protocols';
import { UpdateClientController } from './update-client-controller';

const chance = new Chance();

const makeClientData = () => {
  const client = {
    name: chance.name(),
    email: chance.email(),
  };

  return client;
};

const makeUpdateClientUseCase = () => {
  class UpdateClientSpy implements UpdateClient {
    update = async (clientId: number, data: UpdateClientData): Promise<ClientModel | undefined> => ({
      id: clientId, email: chance.email(), name: chance.name(), ...data,
    });
  }

  return new UpdateClientSpy();
};

const makeSut = () => {
  const updateClientSpy = makeUpdateClientUseCase();
  const sut = new UpdateClientController(updateClientSpy);

  return {
    sut,
    updateClientSpy,
  };
};

describe('Update Client Controller', () => {
  describe('Success cases', () => {
    it('Should update a client', async () => {
      const { sut } = makeSut();
      const clientId = chance.integer();

      const httpRequest: HttpRequest = {
        body: { name: chance.name() },
        params: { clientId },
      };

      const httpResponse: HttpResponse = await sut.handle(httpRequest);
      expect(httpResponse.status).toBe(200);
      expect(httpResponse.data.id).toEqual(clientId);
    });
  });

  describe('Error cases', () => {
    describe('Bad request', () => {
      it('Should update a client without  data and receive bad request error', async () => {
        const { sut } = makeSut();
        const httpRequest: HttpRequest = {
          params: { clientId: chance.integer() },
        };
        const httpResponse: HttpResponse = await sut.handle(httpRequest);

        expect(httpResponse.status).toBe(400);
      });
    });

    describe('Not found error', () => {
      it('Should update a client that not exists', async () => {
        const { sut, updateClientSpy } = makeSut();
        jest.spyOn(updateClientSpy, 'update').mockImplementationOnce(() => Promise.resolve(undefined));

        const httpRequest: HttpRequest = {
          body: { name: chance.name() },
          params: { clientId: chance.integer() },
        };
        const httpResponse: HttpResponse = await sut.handle(httpRequest);
        expect(httpResponse.status).toBe(404);
      });
    });

    describe('Internal server error', () => {
      it('Should update a client and receive internal server error', async () => {
        const { sut, updateClientSpy } = makeSut();
        jest.spyOn(updateClientSpy, 'update').mockImplementationOnce(async () => {
          throw new Error();
        });

        const httpRequest: HttpRequest = {
          body: { name: chance.name() },
          params: { clientId: chance.integer() },
        };
        const httpResponse: HttpResponse = await sut.handle(httpRequest);
        expect(httpResponse.status).toBe(500);
      });
    });
  });
});
