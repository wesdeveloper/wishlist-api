import { RemoveClient } from '../../../domain/usecases';
import { RemoveClientRepository } from '../../protocols';

export class RemoveClientUseCase implements RemoveClient {
  constructor(private readonly removeClientRepository: RemoveClientRepository) {}

  remove = async (clientId: number): Promise<boolean> => this.removeClientRepository.remove(clientId);
}
