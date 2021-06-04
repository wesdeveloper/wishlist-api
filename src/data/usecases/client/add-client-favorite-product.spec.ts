import Chance from 'chance';
import { AddClientFavoriteProductRepository, RequestClient, RequestClientResponse } from '../../protocols';
import { AddClientFavoriteProductUseCase } from './add-client-favorite-product';
import { makeFetchClientRepository } from './fetch-client.spec';

const chance = new Chance();

const makeClient = () => ({
  id: chance.integer(),
  name: chance.name(),
  email: chance.email(),
});

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

const makeAddClientFavoriteProductRepository = () => {
  class AddClientFavoriteProductUseRepoStub implements AddClientFavoriteProductRepository {
    addFavoriteProduct = async (): Promise<boolean> => true;
  }
  return new AddClientFavoriteProductUseRepoStub();
};

const makeSut = () => {
  const addClientFavoriteProductRepoStub = makeAddClientFavoriteProductRepository();
  const fetchClientRepoStub = makeFetchClientRepository();
  const requestClient = makeRequestClient();

  const sut = new AddClientFavoriteProductUseCase(addClientFavoriteProductRepoStub, fetchClientRepoStub, requestClient, 'api');

  return {
    sut,
    addClientFavoriteProductRepoStub,
    fetchClientRepoStub,
    requestClient,
  };
};

describe('Add Client Favorite Product usecase', () => {
  it('Should add a client favorite product', async () => {
    const {
      sut,
      fetchClientRepoStub,
    } = makeSut();
    jest.spyOn(fetchClientRepoStub, 'fetchWithFilters').mockImplementationOnce(async () => [makeClient()]);

    const isAdded = await sut.add(chance.integer(), chance.guid());
    expect(isAdded).toBeTruthy();
  });

  describe('Error cases', () => {
    describe('Not found error', () => {
      it('Should add a client favorite product that client not exists', async () => {
        const { sut } = makeSut();

        const isAdded = await sut.add(chance.integer(), chance.guid());
        expect(isAdded).toBeFalsy();
      });

      it('Should add a client favorite product that product not exists', async () => {
        const {
          sut,
          fetchClientRepoStub,
          requestClient,
        } = makeSut();

        jest.spyOn(fetchClientRepoStub, 'fetchWithFilters').mockImplementationOnce(async () => [makeClient()]);
        jest.spyOn(requestClient, 'get').mockImplementationOnce(async () => ({ status: 404 }));

        const isAdded = await sut.add(chance.integer(), chance.guid());
        expect(isAdded).toBeFalsy();
      });
    });
  });
});
