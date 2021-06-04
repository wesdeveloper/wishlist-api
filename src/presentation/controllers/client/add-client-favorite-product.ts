import { AddClientFavoriteProduct } from '../../../domain/usecases';
import { noContent, notFound, serverError } from '../../helpers';
import { Controller, HttpResponse } from '../../protocols';

export class AddClientFavoriteProductController implements Controller {
  constructor(
    private readonly addClientFavoriteProduct: AddClientFavoriteProduct,
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const { params: { clientId, productId } } = request;

      const isAdded = await this.addClientFavoriteProduct.add(clientId, productId);
      if (!isAdded) {
        return notFound();
      }

      return noContent();
    } catch (e) {
      return serverError();
    }
  }
}
