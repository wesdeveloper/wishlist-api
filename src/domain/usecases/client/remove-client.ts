export interface RemoveClient {
  remove(clientId: number): Promise<boolean>
}
