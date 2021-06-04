import Chance from 'chance';
import { RemoveClient } from '../../../domain/usecases';
import { HttpRequest, HttpResponse } from '../../protocols';
import { RemoveClientController } from './remove-client';

const chance = new Chance();

const makeRemoveClientUseCase = () => {
  class RemoveClientSpy implements RemoveClient {
    remove = async (): Promise<boolean> => true;
  }

  return new RemoveClientSpy();
};

const makeSut = () => {
  const removeClientSpy = makeRemoveClientUseCase();
  const sut = new RemoveClientController(removeClientSpy);

  return {
    sut,
    removeClientSpy,
  };
};

describe('Remoce Client Controller', () => {
  describe('Success cases', () => {
    it('Should remove a client', async () => {
      const { sut } = makeSut();
      const clientId = chance.integer();

      const httpRequest: HttpRequest = {
        params: { clientId },
      };

      const httpResponse: HttpResponse = await sut.handle(httpRequest);
      expect(httpResponse.status).toBe(204);
    });
  });

  describe('Error cases', () => {
    describe('Not found error', () => {
      it('Should remove a client that not exists', async () => {
        const { sut, removeClientSpy } = makeSut();
        jest.spyOn(removeClientSpy, 'remove').mockImplementationOnce(() => Promise.resolve(false));

        const httpRequest: HttpRequest = {
          params: { clientId: chance.integer() },
        };
        const httpResponse: HttpResponse = await sut.handle(httpRequest);
        expect(httpResponse.status).toBe(404);
      });
    });

    describe('Internal server error', () => {
      it('Should remove a client and receive internal server error', async () => {
        const { sut, removeClientSpy } = makeSut();
        jest.spyOn(removeClientSpy, 'remove').mockImplementationOnce(async () => {
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
