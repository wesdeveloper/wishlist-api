import { ClientModel, FetchClientModel } from '../../models';

export interface FetchClient {
  fetch(page: number, pageSize: number): Promise<FetchClientModel>
  fetchWithFilters(filters: object): Promise<ClientModel[]>
}
