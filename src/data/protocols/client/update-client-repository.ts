import { UpdateClientData } from '../../../domain/usecases';
import { ClientModel } from '../../../domain/models';

export interface UpdateClientRepository {
  update(clientId: number, data: UpdateClientData): Promise<ClientModel|undefined>
}
