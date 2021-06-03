import { FetchClientModel } from '../../models';

export interface FetchClient {
  fetch(page: number, pageSize: number): Promise<FetchClientModel>
}
