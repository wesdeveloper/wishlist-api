import { CreateClientData } from '../../../domain/usecases/create-client';
import { ClientModel } from '../../../domain/models/client';

export interface CreateClientRepository {
  insert(clientData: CreateClientData): Promise<ClientModel>
}
