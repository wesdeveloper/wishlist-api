import { ClientModel } from '../../../domain/models';
import { UpdateClient, UpdateClientData } from '../../../domain/usecases';
import { UpdateClientRepository } from '../../protocols';

export class UpdateClientUseCase implements UpdateClient {
  constructor(private readonly updateClientRepository: UpdateClientRepository) {}

  update = async (clientId: number, data: UpdateClientData): Promise<ClientModel | undefined> => this.updateClientRepository.update(clientId, data);
}
