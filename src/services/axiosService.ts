import axios, { AxiosError, AxiosResponse } from 'axios';

export interface ErrorData {
  status?: number;
  message: string;
}

const BASE_URL = process.env.REACT_APP_API_URL;
const UNAUTHORIZED = 401;
const AUTH_REDIRECT_URL = `${BASE_URL}/oauth2/authorization/okta`;

const apiClient = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiError = (error: AxiosError<ErrorData>): ErrorData => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
  return {
    message: error.message || 'Network error or server did not respond.',
  };
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ErrorData>) => {
    const apiError = handleApiError(error);

    if (apiError.status === UNAUTHORIZED) {
      window.location.href = AUTH_REDIRECT_URL;
    }

    return Promise.reject(apiError);
  }
);

export const setupInterceptors = (store: any) => {
  apiClient.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default apiClient;
