import { ClientModel } from '../../../domain/models';
import { CreateClient, CreateClientData } from '../../../domain/usecases';
import { CreateClientRepository } from '../../protocols';

export class CreateClientUseCase implements CreateClient {
  constructor(private readonly createClientRepository: CreateClientRepository) {}

  create(clientData: CreateClientData): Promise<ClientModel> {
    return this.createClientRepository.insert(clientData);
  }
}
