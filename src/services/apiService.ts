import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

interface ApiRequestParams {
  endpoint: string;
  method: Method;
  token?: string;
}

const apiService = async ({ endpoint, method, token }: ApiRequestParams) => {
  const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;

  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      // Handle known server errors
      console.error('Error data:', err.response.data);
      console.error('Error status:', err.response.status);
    } else {
      // Handle unknown errors
      console.error('Error message:', err.message);
    }
    throw error; // Re-throw to allow caller to handle the error as well
  }
};

export default apiService;
