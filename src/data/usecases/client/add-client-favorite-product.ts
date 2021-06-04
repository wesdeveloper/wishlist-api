import {
  AddClientFavoriteProduct,
  FetchClient,
} from '../../../domain/usecases';
import { AddClientFavoriteProductRepository, RequestClient } from '../../protocols';

export class AddClientFavoriteProductUseCase implements AddClientFavoriteProduct {
  constructor(
    private readonly addClientFavoriteProductRepository: AddClientFavoriteProductRepository,
    private readonly fetchClient: FetchClient,
    private readonly requestClient: RequestClient,
    private readonly productApiHost: string,
  ) {}

  add = async (clientId: number, productId: string): Promise<boolean> => {
    const [client] = await this.fetchClient.fetchWithFilters({ id: clientId });
    if (!client) {
      return false;
    }

    const { status } = await this.requestClient.get(this.getProductApiUrl(productId));
    if (status !== 200) {
      return false;
    }

    return this.addClientFavoriteProductRepository.addFavoriteProduct(clientId, productId);
  };

  getProductApiUrl = (productId: string) => `${this.productApiHost}/api/product/${productId}/`;
}
