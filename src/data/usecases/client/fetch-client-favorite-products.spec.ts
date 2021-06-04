import Chance from 'chance';
import { FetchClientFavoriteProductsPaginatedRepository } from '../../../domain/models';
import { FetchClientFavoriteProductsRepository, RequestClient, RequestClientResponse } from '../../protocols';
import { FetchClientFavoriteProductsUseCase } from './fetch-client-favorite-products';

const chance = new Chance();

const makeRequestClient = () => {
  class TestRequestClient implements RequestClient {
    get = async (): Promise<RequestClientResponse> => {
      const product = {
        price: 1699.0,
        image: 'http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg',
        brand: 'bébé confort',
        id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
        title: 'Cadeira para Auto Iseos Bébé Confort Earth Brown',
      };

      const mockData: RequestClientResponse = {
        status: 200,
        data: product,
      };

      return mockData;
    };
  }

  return new TestRequestClient();
};

export const makeFetchClientFavoriteProductsRepository = () => {
  class FetchClientFavoriteProductsUseRepoStub implements FetchClientFavoriteProductsRepository {
    fetch = async (clientId: number, page: number, pageSize: number): Promise<FetchClientFavoriteProductsPaginatedRepository> => {
      const fetchedProductsData = {
        products: [],
        pagination: {
          page,
          pageSize,
        },
      };

      return fetchedProductsData;
    };
  }

  return new FetchClientFavoriteProductsUseRepoStub();
};

const makeSut = () => {
  const requestClient = makeRequestClient();
  const fetchClientFavoriteProductsRepoStub = makeFetchClientFavoriteProductsRepository();
  const sut = new FetchClientFavoriteProductsUseCase(fetchClientFavoriteProductsRepoStub, requestClient, chance.url());

  return { sut };
};

describe('Fetch Clients usecase', () => {
  it('Should fetch clients', async () => {
    const { sut } = makeSut();
    const fetchedClientData = await sut.fetchProducts(chance.integer());

    expect(fetchedClientData).toEqual(expect.objectContaining({ products: expect.any(Array), pagination: expect.any(Object) }));
  });
});
