import { FetchClientById } from '../../domain/usecases';
import { notFound, serverError } from '../helpers';
import { Controller, HttpResponse } from '../protocols';

export class FetchClientByIdController implements Controller {
  constructor(
    private readonly fetchClient: FetchClientById,
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const { params: { clientId } } = request;

      const client = await this.fetchClient.fetchById(clientId);

      if (!client) {
        return notFound();
      }

      return {
        status: 200,
        data: client,
      };
    } catch (e) {
      return serverError();
    }
  }
}
