import { FetchClientFavoriteProductsPaginated } from '../../models';

export interface FetchClientFavoriteProducts {
  fetchProducts(clientId: number, pagination: { page: number, pageSize: number }): Promise<FetchClientFavoriteProductsPaginated>
}
