import { CreateClient } from 'src/domain/usecases/create-client';
import { validateObject } from '../../utils/validator';
import { badRequest, serverError } from '../helpers';
import { Controller, HttpResponse } from '../protocols';
import { clientCreateSchema } from '../protocols/client-validator';

export class CreateClientController implements Controller {
  constructor(
    private readonly createClient: CreateClient,
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const { body } = request;

      const validationResult = validateObject(body, clientCreateSchema);
      if (!validationResult.isValid) {
        return badRequest(validationResult.errors);
      }

      const client = await this.createClient.create(body);

      return {
        status: 201,
        data: client,
      };
    } catch (e) {
      return serverError();
    }
  }
}
