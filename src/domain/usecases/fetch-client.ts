import { FetchClientModel } from '../models/client';

export interface FetchClient {
  fetch(page: number, pageSize: number): Promise<FetchClientModel>
}
