export interface RemoveClientRepository {
  remove(clientId: number): Promise<boolean>
}
