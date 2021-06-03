import { FetchClientModel } from '../../../domain/models';

export interface FetchClientRepository {
  fetch(page: number, pageSize: number): Promise<FetchClientModel>
}
