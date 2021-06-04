export interface AddClientFavoriteProduct {
  add(clientId: number, productId: string): Promise<boolean>
}
