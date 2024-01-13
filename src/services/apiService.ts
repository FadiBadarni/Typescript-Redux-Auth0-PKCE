import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

interface ApiRequestParams {
  endpoint: string;
  method: Method;
}

const apiService = async ({ endpoint, method }: ApiRequestParams) => {
  const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;

  const config: AxiosRequestConfig = {
    method,
    url,
    withCredentials: true,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error data:', err.response.data);
      console.error('Error status:', err.response.status);
    } else {
      console.error('Error message:', err.message);
    }
    throw error;
  }
};

export default apiService;
