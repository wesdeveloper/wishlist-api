export interface AddClientFavoriteProductRepository {
  add(clientId: number, productId: string): Promise<boolean>
}
