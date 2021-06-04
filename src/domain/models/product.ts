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
