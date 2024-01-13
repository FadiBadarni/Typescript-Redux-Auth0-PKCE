import { createSlice } from '@reduxjs/toolkit';
import { UserState, LoadingStatus } from './userTypes';

const initialState: UserState = {
  data: null,
  status: LoadingStatus.Idle,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
