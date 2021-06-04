import { FetchClientByIdRepository } from '../../protocols';
import { ClientModel } from '../../../domain/models';
import { FetchClientById } from '../../../domain/usecases';

export class FetchClientByIdUseCase implements FetchClientById {
  constructor(private readonly fetchClientByIdRepository: FetchClientByIdRepository) {}

  fetchById = async (clientId: number): Promise<ClientModel | undefined> => {
    const fetchedClientData = await this.fetchClientByIdRepository.fetchById(clientId);

    return fetchedClientData;
  };
}
