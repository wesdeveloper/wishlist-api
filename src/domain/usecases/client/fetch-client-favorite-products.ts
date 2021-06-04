import { FetchClientFavoriteProductsPaginated } from '../../models';

export interface FetchClientFavoriteProducts {
  fetchProducts(clientId: number, page: number, pageSize: number): Promise<FetchClientFavoriteProductsPaginated>
}
