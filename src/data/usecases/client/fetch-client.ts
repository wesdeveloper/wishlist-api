import { FetchClientRepository } from '../../protocols';
import { FetchClientModel } from '../../../domain/models/client';
import { FetchClient } from '../../../domain/usecases/fetch-client';

export class FetchClientUseCase implements FetchClient {
  constructor(private readonly fetchClientRepository: FetchClientRepository) {}

  fetch = async (page: number = 1, pageSize: number = 10): Promise<FetchClientModel> => {
    const fetchedClientData = await this.fetchClientRepository.fetch(page, pageSize);

    return fetchedClientData;
  };
}
