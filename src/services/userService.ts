import apiClient, { ErrorData } from './axiosService';

class UserService {
  async fetchUserInfoService() {
    try {
      const response = await apiClient.post('/user/register');
      return response.data;
    } catch (error) {
      const apiError = error as ErrorData;
      throw new Error(apiError.message || 'Failedo');
    }
  }
}

const userServiceInstance = new UserService();
export default userServiceInstance;
