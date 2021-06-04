import { FetchClientFavoriteProductsUseCase } from '../../data/usecases/client/fetch-client-favorite-products';
import { AxiosClient } from '../../data/utils/axios-client';
import database from '../../infra/db/mysql/db';
import { ClientRepository } from '../../infra/db/mysql/client-repository/client-repository';
import {
  CreateClientUseCase,
  FetchClientUseCase,
  FetchClientByIdUseCase,
  UpdateClientUseCase,
  RemoveClientUseCase,
  AddClientFavoriteProductUseCase,
} from '../../data/usecases';
import {
  AddClientFavoriteProductController,
  CreateClientController,
  FetchClientByIdController,
  FetchClientController,
  FetchClientFavoriteProductsController,
  RemoveClientController,
  UpdateClientController,
} from '../../presentation/controllers';

const { PRODUCT_API_HOST } = process.env;

const dbConnection = database.getConnection();
const clientRepository = new ClientRepository(dbConnection);
const fetchClient = new FetchClientUseCase(clientRepository);

export const makeCreateClientController = (): CreateClientController => {
  const createClient = new CreateClientUseCase(clientRepository, fetchClient);
  const createClientController = new CreateClientController(createClient);

  return createClientController;
};

export const makeFetchClientController = (): FetchClientController => {
  const fetchClientController = new FetchClientController(fetchClient);

  return fetchClientController;
};

export const makeFetchClientByIdController = (): FetchClientByIdController => {
  const fetchClientById = new FetchClientByIdUseCase(clientRepository);
  const fetchClientByIdController = new FetchClientByIdController(fetchClientById);

  return fetchClientByIdController;
};

export const makeUpdateClientController = (): UpdateClientController => {
  const updateClient = new UpdateClientUseCase(clientRepository);
  const updateClientController = new UpdateClientController(updateClient);

  return updateClientController;
};

export const makeRemoveClientController = (): RemoveClientController => {
  const removeClient = new RemoveClientUseCase(clientRepository);
  const removeClientController = new RemoveClientController(removeClient);

  return removeClientController;
};

export const makeAddClientFavoriteProductController = (): AddClientFavoriteProductController => {
  const axiosClient = new AxiosClient();
  const addClientFavoriteProduct = new AddClientFavoriteProductUseCase(clientRepository, clientRepository, axiosClient, PRODUCT_API_HOST || '');
  const addClientFavoriteProductController = new AddClientFavoriteProductController(addClientFavoriteProduct);

  return addClientFavoriteProductController;
};

export const makeFetchClientFavoriteProductController = (): FetchClientFavoriteProductsController => {
  const axiosClient = new AxiosClient();
  const fetchClientFavoriteProducts = new FetchClientFavoriteProductsUseCase(clientRepository, axiosClient, PRODUCT_API_HOST || '');
  const fetchClientFavoriteProductsController = new FetchClientFavoriteProductsController(fetchClientFavoriteProducts, clientRepository);

  return fetchClientFavoriteProductsController;
};
