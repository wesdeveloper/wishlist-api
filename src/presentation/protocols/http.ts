export interface HttpRequest {
  body: any,
  query: any
}

export interface HttpResponse {
  status: number,
  data?: any,
}
