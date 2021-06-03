export interface ClientModel {
  id: number
  name: string
  email: string
}

export interface FetchClientModel {
  clients: ClientModel[],
  pagination: any
}
