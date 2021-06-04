import { FetchClientFavoriteProductsPaginatedRepository } from '../../../domain/models';

export interface FetchClientFavoriteProductsRepository {
  fetch(clientId: number, page: number, pageSize: number): Promise<FetchClientFavoriteProductsPaginatedRepository>,
}
