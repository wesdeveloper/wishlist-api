import { Knex } from 'knex';
import { ClientModel } from '../../../../domain/models/client';
import { CreateClientData } from '../../../../domain/usecases/create-client';
import { CreateClientRepository } from '../../../../data/protocols/client/create-client-repository';

export class ClientRepository implements CreateClientRepository {
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
}
