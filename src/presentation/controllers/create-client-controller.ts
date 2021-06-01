import { validateObject } from '../../utils/validator';
import { badRequest } from '../helpers';
import { Controller, HttpResponse } from '../protocols';
import { clientCreateSchema } from '../protocols/client-validator';

export class CreateClientController implements Controller {
  async handle(request: any): Promise<HttpResponse> {
    const { body } = request;

    const validationResult = validateObject(body, clientCreateSchema);
    if (!validationResult.isValid) {
      return badRequest(validationResult.errors);
    }

    return {
      status: 201,
      data: { ...request.body, id: 1 },
    };
  }
}
