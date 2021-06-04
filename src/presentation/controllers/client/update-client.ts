import { validateObject } from '../../../utils';
import { UpdateClient } from '../../../domain/usecases';
import { clientUpdateSchema } from '../../protocols/client-validator';
import {
  badRequest,
  notFound,
  okRequest,
  serverError,
} from '../../helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../protocols';

export class UpdateClientController implements Controller {
  constructor(
    private readonly updateClient: UpdateClient,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params: { clientId } } = request;

      const validationResult = validateObject(body, clientUpdateSchema);
      if (!validationResult.isValid) {
        return badRequest(validationResult.errors);
      }

      const client = await this.updateClient.update(clientId, body);

      if (!client) {
        return notFound();
      }

      return okRequest(client);
    } catch (e) {
      return serverError();
    }
  }
}
