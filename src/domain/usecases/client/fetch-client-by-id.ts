import { ClientModel } from '../../models';

export interface FetchClientById {
  fetchById(clientId: number): Promise<ClientModel|undefined>
}
