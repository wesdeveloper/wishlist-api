import { FetchClientRepository } from '../../protocols';
import { ClientModel, FetchClientModel } from '../../../domain/models';
import { FetchClient } from '../../../domain/usecases';

export class FetchClientUseCase implements FetchClient {
  constructor(private readonly fetchClientRepository: FetchClientRepository) {}

  fetch = async (page: number = 1, pageSize: number = 10): Promise<FetchClientModel> => {
    const fetchedClientData = await this.fetchClientRepository.fetch(page, pageSize);

    return fetchedClientData;
  };

  fetchWithFilters = async (filters: object): Promise<ClientModel[]> => this.fetchClientRepository.fetchWithFilters(filters);
}
