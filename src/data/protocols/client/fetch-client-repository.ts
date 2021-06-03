import { FetchClientModel } from '../../../domain/models/client';

export interface FetchClientRepository {
  fetch(page: number, pageSize: number): Promise<FetchClientModel>
}
