import { Knex } from 'knex';
import { CreateClientRepository, FetchClientByIdRepository, FetchClientRepository } from '../../../../data/protocols';
import { ClientModel, FetchClientModel } from '../../../../domain/models';
import { CreateClientData } from '../../../../domain/usecases';

export class ClientRepository implements CreateClientRepository, FetchClientRepository, FetchClientByIdRepository {
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

  fetchById = async (clientId: number): Promise<ClientModel | undefined> => {
    const [clientData] = await this.dbConnection<ClientModel>('client')
      .select('*')
      .where('id', clientId);

    return clientData;
  };
}
