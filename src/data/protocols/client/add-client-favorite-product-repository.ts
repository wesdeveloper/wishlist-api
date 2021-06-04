export interface AddClientFavoriteProductRepository {
  addFavoriteProduct(clientId: number, productId: string): Promise<boolean>
}
