import axios, { AxiosError, AxiosResponse } from 'axios';
import { clearAccessToken, setAccessToken } from 'features/auth/authReducer';
import { jwtDecode } from 'jwt-decode';

export interface ErrorData {
  status?: number;
  message: string;
}
interface DecodedToken {
  exp: number;
}

const BASE_URL = process.env.REACT_APP_API_URL;
const UNAUTHORIZED = 401;
const AUTH_REDIRECT_URL = `${BASE_URL}oauth2/authorization/okta`;

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

export const setupInterceptors = (store: any, getAccessTokenSilently: any) => {
  apiClient.interceptors.request.use(
    async (config) => {
      let token = store.getState().auth.accessToken;
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          if (decoded.exp < Date.now() / 1000) {
            token = await getAccessTokenSilently();
            store.dispatch(setAccessToken(token));
          }
        } catch (error) {
          console.error('Error decoding or refreshing access token', error);
          store.dispatch(clearAccessToken());
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default apiClient;
