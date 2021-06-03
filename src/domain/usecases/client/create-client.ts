import { ClientModel } from '../../models';

export interface CreateClientData {
  name: string
  email: string
}

export interface CreateClient {
  create(client: CreateClientData): Promise<ClientModel>
}
