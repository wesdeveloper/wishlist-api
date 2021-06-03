import { CreateClientData } from '../../../domain/usecases';
import { ClientModel } from '../../../domain/models';

export interface CreateClientRepository {
  insert(clientData: CreateClientData): Promise<ClientModel>
}
