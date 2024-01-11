import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, UserState, LoadingStatus } from './userTypes';

const initialState: UserState = {
  data: null,
  status: LoadingStatus.Idle,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.status = LoadingStatus.Loading;
    },
    userLoaded: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
      state.status = LoadingStatus.Succeeded;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = LoadingStatus.Failed;
    },
    resetUser: (state) => {
      state.data = null;
      state.status = LoadingStatus.Idle;
      state.error = null;
    },
  },
});

export const { startLoading, userLoaded, setError, resetUser } =
  userSlice.actions;

export default userSlice.reducer;
