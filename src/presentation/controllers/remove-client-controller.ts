import { RemoveClient } from '../../domain/usecases';
import {
  notFound,
  noContent,
  serverError,
} from '../helpers';
import { Controller, HttpRequest, HttpResponse } from '../protocols';

export class RemoveClientController implements Controller {
  constructor(
    private readonly removeClient: RemoveClient,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { params: { clientId } } = request;

      const isRemoved = await this.removeClient.remove(clientId);

      if (!isRemoved) {
        return notFound();
      }

      return noContent();
    } catch (e) {
      return serverError();
    }
  }
}
