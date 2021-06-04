import { FetchClientFavoriteProductsRepository, RequestClient } from '../../protocols';
import { FetchClientFavoriteProductsPaginated, Product } from '../../../domain/models';
import { FetchClientFavoriteProducts } from '../../../domain/usecases';

export class FetchClientFavoriteProductsUseCase implements FetchClientFavoriteProducts {
  constructor(
    private readonly fetchClientFavoriteProductsRepository: FetchClientFavoriteProductsRepository,
    private readonly requestClient: RequestClient,
    private readonly productApiHost: string,
  ) {}

  fetchProducts = async (clientId: number, page = 1, pageSize = 10): Promise<FetchClientFavoriteProductsPaginated> => {
    const { products: favoriteProducts, pagination } = await this.fetchClientFavoriteProductsRepository.fetchClientFavoriteProducts(clientId, page, pageSize);

    const products = await Promise.all(favoriteProducts.map(({ productId }) => this.getProducData(productId)));

    return {
      products,
      pagination,
    };
  };

  getProductApiUrl = (productId: string) => `${this.productApiHost}/api/product/${productId}/`;

  getProducData = async (productId: string): Promise<Product> => {
    const { data } = await this.requestClient.get(this.getProductApiUrl(productId));

    return data;
  };
}
