import axios from 'axios';
import { RequestClient, RequestClientResponse } from '../protocols';

export class AxiosClient implements RequestClient {
  get = async (url: string): Promise<RequestClientResponse> => {
    try {
      const { status, data } = await axios.get(url);
      return { status, data };
    } catch (e) {
      return { status: e?.response?.status };
    }
  };
}
