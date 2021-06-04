export interface RequestClientResponse {
  status: number
  data?: any
}

export interface RequestClient {
  get(url: string): Promise<RequestClientResponse>
}
