export interface HttpRequest {
  body?: any,
  query?: any,
  params?: any
}

export interface HttpResponse {
  status: number,
  data?: any,
}
