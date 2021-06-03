import { ClientModel } from '../../models';

export interface UpdateClientData {
  name?: string
}

export interface UpdateClient {
  update(clientId: number, data: UpdateClientData): Promise<ClientModel|undefined>
}
