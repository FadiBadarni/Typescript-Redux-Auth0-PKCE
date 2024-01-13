import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService';
import { UserData } from './userTypes';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = await apiService({
        endpoint: 'auth/callback',
        method: 'POST',
      });
      return userInfo as UserData;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);
