import { validateObject } from '../../utils/validator';
import { badRequest } from '../helpers';
import { Controller, HttpResponse } from '../protocols';
import { clientSignUpSchema } from '../protocols/client-validator';

export class ClientSignUpController implements Controller {
  async handle(request: any): Promise<HttpResponse> {
    const { body } = request;

    const validationResult = validateObject(body, clientSignUpSchema);
    if (!validationResult.isValid) {
      return badRequest(validationResult.errors);
    }

    return {
      status: 201,
      data: { ...request.body, id: 1 },
    };
  }
}
