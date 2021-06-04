import { Knex } from 'knex';
import {
  AddClientFavoriteProductRepository,
  CreateClientRepository,
  FetchClientByIdRepository,
  FetchClientRepository,
  RemoveClientRepository,
  UpdateClientRepository,
} from '../../../../data/protocols';
import { ClientModel, FetchClientModel } from '../../../../domain/models';
import { CreateClientData, UpdateClientData } from '../../../../domain/usecases';

export class ClientRepository implements
  CreateClientRepository,
  FetchClientRepository,
  FetchClientByIdRepository,
  UpdateClientRepository,
  RemoveClientRepository,
  AddClientFavoriteProductRepository {
  constructor(private readonly dbConnection: Knex<any, unknown[]>) {
  }

  insert = async (clientData: CreateClientData): Promise<ClientModel> => {
    const [clientId] = await this.dbConnection<ClientModel>('client')
      .returning('id')
      .insert(clientData);

    const [client]: ClientModel[] = await this.dbConnection<ClientModel>('client')
      .where('id', clientId)
      .select('*');

    return client;
  };

  fetch = async (page: number = 1, pageSize: number = 10): Promise<FetchClientModel> => {
    const { data, pagination } = await this.dbConnection<ClientModel>('client')
      .select('*')
      .paginate({ perPage: pageSize, currentPage: page });

    return {
      clients: data,
      pagination,
    };
  };

  fetchWithFilters = async (filters: object): Promise<ClientModel[]> => this.dbConnection<ClientModel>('client')
    .where(filters)
    .select('*');

  fetchById = async (clientId: number): Promise<ClientModel | undefined> => {
    const [clientData] = await this.dbConnection<ClientModel>('client')
      .select('*')
      .where('id', clientId);

    return clientData;
  };

  update = async (clientId: number, data: UpdateClientData): Promise<ClientModel | undefined> => {
    const isUpdated = await this.dbConnection<ClientModel>('client')
      .where('id', clientId)
      .update(data)
      .select('*');

    if (!isUpdated) {
      return;
    }
    return this.fetchById(clientId);
  };

  remove = async (clientId: number): Promise<boolean> => {
    const isRemoved = await this.dbConnection<ClientModel>('client')
      .where('id', clientId)
      .del();

    return !!isRemoved;
  };

  addFavoriteProduct = async (clientId: number, productId: string): Promise<boolean> => {
    const [isAdded] = await this.dbConnection('favorite_products')
      .insert({ client_id: clientId, product_id: productId })
      .select('*');

    return !!isAdded;
  };
}
