import { FetchClientById, FetchClientFavoriteProducts } from '../../../domain/usecases';
import { notFound, okRequest, serverError } from '../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class FetchClientFavoriteProductsController implements Controller {
  constructor(
    private readonly fetchClientFavoriteProducts: FetchClientFavoriteProducts,
    private readonly fetchClient: FetchClientById,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        params: { clientId },
      } = request;

      const page = request.query?.page;
      const pageSize = request.query?.pageSize;

      const client = await this.fetchClient.fetchById(clientId);

      if (!client) {
        return notFound();
      }

      const data = await this.fetchClientFavoriteProducts.fetchProducts(clientId, { page, pageSize });

      return okRequest(data);
    } catch (e) {
      return serverError();
    }
  }
}
