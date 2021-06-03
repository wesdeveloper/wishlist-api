import { ClientModel } from '../../../domain/models';

export interface FetchClientByIdRepository {
  fetchById(clientId: number): Promise<ClientModel|undefined>
}
