import { createAsyncThunk } from '@reduxjs/toolkit';
import authServiceInstance from '../../services/authService';

export const fetchUserInfo = createAsyncThunk('user/info', async () => {
  try {
    const data = await authServiceInstance.fetchUserInfo();
    return data;
  } catch (error) {
    const message = (error as Error).message || 'Failed to fetch user info';
    throw new Error(message);
  }
});
