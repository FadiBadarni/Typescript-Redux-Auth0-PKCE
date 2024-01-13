import apiClient, { ErrorData } from './apiClient';

class UserService {
  async fetchUserInfo() {
    try {
      const response = await apiClient.get('/user/info');
      return response.data;
    } catch (error) {
      const apiError = error as ErrorData;
      throw new Error(apiError.message || 'Failedo');
    }
  }
}

const userServiceInstance = new UserService();
export default userServiceInstance;
