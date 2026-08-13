import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import * as tokenStore from './token-store';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const baseURL =
  typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL : process.env.API_BASE_URL;

export const apiClient = axios.create({
  baseURL: baseURL ?? '',
});

export function attachAuthHeaders(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = tokenStore.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

export function handleResponseError(error: AxiosError) {
  if (error.response?.status === 401) {
    tokenStore.clearToken();
    tokenStore.clearRefreshToken();
  }
  return Promise.reject(error);
}

apiClient.interceptors.request.use(attachAuthHeaders);
apiClient.interceptors.response.use((response) => response, handleResponseError);
