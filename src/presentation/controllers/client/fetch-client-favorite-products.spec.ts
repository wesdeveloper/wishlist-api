import Chance from 'chance';
import { ClientModel, FetchClientFavoriteProductsPaginated, Product } from '../../../domain/models';
import { FetchClientById, FetchClientFavoriteProducts } from '../../../domain/usecases';
import { HttpRequest, HttpResponse } from '../../protocols';
import { FetchClientFavoriteProductsController } from './fetch-client-favorite-products';

const chance = new Chance();

const makeProduct = (): Product => ({
  id: chance.guid(),
  title: chance.name(),
  price: chance.integer(),
  image: chance.url(),
  brand: chance.string(),
});

const makeClientData = () => {
  const client = {
    name: chance.name(),
    email: chance.email(),
  };

  return client;
};

const makeFetchClientFavoriteProductsUseCase = () => {
  class FetchClientFavoriteProductsSpy implements FetchClientFavoriteProducts {
    fetchProducts = async (): Promise<FetchClientFavoriteProductsPaginated> => ({
      products: [makeProduct()],
      pagination: {},
    });
  }

  return new FetchClientFavoriteProductsSpy();
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
  const fetchClientFavoriteProductsSpy = makeFetchClientFavoriteProductsUseCase();
  const fetchClientByIdSpy = makeFetchClientByIdUseCase();
  const sut = new FetchClientFavoriteProductsController(fetchClientFavoriteProductsSpy, fetchClientByIdSpy);

  return {
    sut,
    fetchClientByIdSpy,
  };
};

describe('Fetch Client favorite products Controller', () => {
  describe('Success cases', () => {
    it('Should fetch client favorite products', async () => {
      const { sut } = makeSut();

      const httpRequest: HttpRequest = {
        params: { clientId: chance.integer() },
      };

      const httpResponse: HttpResponse = await sut.handle(httpRequest);
      expect(httpResponse.status).toBe(200);
      expect(httpResponse.data).toEqual(expect.objectContaining({ products: expect.any(Array), pagination: expect.any(Object) }));
    });
  });
});
