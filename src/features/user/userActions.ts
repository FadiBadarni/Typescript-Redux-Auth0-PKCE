import { createAsyncThunk } from '@reduxjs/toolkit';
import userServiceInstance from 'services/userService';

export const fetchUserInfo = createAsyncThunk('user/info', async () => {
  try {
    const data = await userServiceInstance.fetchUserInfoService();
    return data;
  } catch (error) {
    const message = (error as Error).message || 'Failed to fetch user info';
    throw new Error(message);
  }
});
