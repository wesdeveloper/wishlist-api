export interface Product {
  price: number,
  image: string,
  brand: string,
  id: string,
  title: string
}

export interface FetchClientFavoriteProductsPaginated {
  products: Product[],
  pagination: any
}

export interface ProducModel {
  id: number,
  clientId: number,
  productId: string
}

export interface FetchClientFavoriteProductsPaginatedRepository {
  products: ProducModel[],
  pagination: any
}
