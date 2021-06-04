import Chance from 'chance';
import { AddClientFavoriteProduct } from '../../../domain/usecases';
import {
  HttpRequest,
  HttpResponse,
} from '../../protocols';
import { AddClientFavoriteProductController } from './add-client-favorite-product';

const chance = new Chance();

const makeAddClientFavoriteProductUseCase = () => {
  class AddClientFavoriteProductSpy implements AddClientFavoriteProduct {
    add = async (): Promise<boolean> => true;
  }

  const createClientSpy = new AddClientFavoriteProductSpy();
  return createClientSpy;
};
const makeSut = () => {
  const addClientFavoriteProductSpy = makeAddClientFavoriteProductUseCase();
  const sut = new AddClientFavoriteProductController(addClientFavoriteProductSpy);

  return {
    sut,
    addClientFavoriteProductSpy,
  };
};

const makeClient = () => {
  const client = {
    id: chance.integer(),
    name: chance.name(),
    email: chance.email(),
  };

  return client;
};

describe('Add Client favorite product Controller', () => {
  describe('Success cases', () => {
    it('Should add a client favorite product', async () => {
      const clientData = makeClient();
      const { sut } = makeSut();

      const httpRequest: HttpRequest = {
        params: {
          clientId: clientData.id,
          productId: chance.integer(),
        },
      };

      const httpResponse: HttpResponse = await sut.handle(httpRequest);
      expect(httpResponse.status).toBe(204);
    });
  });

  describe('Error cases', () => {
    describe('Not found error', () => {
      it('Should add a client favorite product that not exists', async () => {
        const clientData = makeClient();
        const { sut, addClientFavoriteProductSpy } = makeSut();
        jest.spyOn(addClientFavoriteProductSpy, 'add').mockImplementationOnce(() => Promise.resolve(false));

        const httpRequest: HttpRequest = {
          params: {
            clientId: clientData.id,
            productId: chance.integer(),
          },
        };
        const httpResponse: HttpResponse = await sut.handle(httpRequest);
        expect(httpResponse.status).toBe(404);
      });
    });

    describe('Internal server error', () => {
      it('Should add a client favorite product and receive internal server error', async () => {
        const clientData = makeClient();

        const { sut, addClientFavoriteProductSpy } = makeSut();
        jest.spyOn(addClientFavoriteProductSpy, 'add').mockImplementationOnce(async () => {
          throw new Error();
        });

        const httpRequest: HttpRequest = {
          params: {
            clientId: clientData.id,
            productId: chance.integer(),
          },
        };
        const httpResponse: HttpResponse = await sut.handle(httpRequest);
        expect(httpResponse.status).toBe(500);
      });
    });
  });
});
