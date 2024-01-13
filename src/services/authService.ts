import apiClient, { ErrorData } from './apiClient';

class AuthService {
  async fetchUserInfo() {
    try {
      const response = await apiClient.get('/auth/callback');
      return response.data;
    } catch (error) {
      const apiError = error as ErrorData;
      throw new Error(apiError.message || 'Failedo');
    }
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
