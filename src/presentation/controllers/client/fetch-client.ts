import { FetchClient } from '../../../domain/usecases';
import { serverError } from '../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class FetchClientController implements Controller {
  constructor(
    private readonly fetchClient: FetchClient,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { page, pageSize } = request.query;
      const clientsData = await this.fetchClient.fetch(page, pageSize);

      return {
        status: 200,
        data: clientsData,
      };
    } catch (e) {
      return serverError();
    }
  }
}
