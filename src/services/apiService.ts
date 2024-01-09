import axios, { AxiosError } from 'axios';

const callApi = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error data:', err.response.data);
      console.error('Error status:', err.response.status);
    } else {
      console.error('Error message:', err.message);
    }
  }
};

export default callApi;
