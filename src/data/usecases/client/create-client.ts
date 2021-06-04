import { ClientModel } from '../../../domain/models';
import { CreateClient, CreateClientData, FetchClient } from '../../../domain/usecases';
import { CreateClientRepository } from '../../protocols';

export class CreateClientUseCase implements CreateClient {
  constructor(
    private readonly createClientRepository: CreateClientRepository,
    private readonly fetchClient: FetchClient,
  ) {}

  create = async (clientData: CreateClientData): Promise<ClientModel> => {
    const [client] = await this.fetchClient.fetchWithFilters({ email: clientData.email });
    if (client) {
      throw Error('email already exists');
    }

    return this.createClientRepository.insert(clientData);
  };
}
