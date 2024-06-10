import { AxiosRequestConfig } from 'axios';
import { handleAxiosError } from '../../error';
import { api } from '../..';


export const post = async <Response, Body>(url: string, body: Body, config?: AxiosRequestConfig) => {
  try {
    const { data } = await api.post<Response>(url, body, config);
    return data;
  } catch (e) {
    throw handleAxiosError(e);
  }
};
