import { CreateClientRepository } from '../../protocols/client/create-client-repository';
import { ClientModel } from '../../../domain/models/client';
import { CreateClient, CreateClientData } from '../../../domain/usecases/create-client';

export class CreateClientUseCase implements CreateClient {
  constructor(private readonly createClientRepository: CreateClientRepository) {}

  create(clientData: CreateClientData): Promise<ClientModel> {
    return this.createClientRepository.insert(clientData);
  }
}