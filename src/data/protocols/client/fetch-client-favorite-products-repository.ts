import { FetchClientFavoriteProductsPaginatedRepository } from '../../../domain/models';

export interface FetchClientFavoriteProductsRepository {
  fetchClientFavoriteProducts(clientId: number, page: number, pageSize: number): Promise<FetchClientFavoriteProductsPaginatedRepository>,
}
