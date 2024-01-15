import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus, RehydrateAction } from 'features/common/commonTypes';
import { REHYDRATE } from 'redux-persist';

export interface AuthState {
  accessToken: string;
  status: LoadingStatus;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: '',
  status: LoadingStatus.Idle,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.status = action.payload
        ? LoadingStatus.Succeeded
        : LoadingStatus.Failed;
    },
    clearAccessToken: (state) => {
      state.accessToken = '';
      state.status = LoadingStatus.Idle;
    },
    setAuthLoading: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: RehydrateAction) => {
      const incomingAuth = action.payload?.auth;
      if (incomingAuth) {
        state.accessToken =
          incomingAuth.accessToken ?? initialState.accessToken;
        state.status = incomingAuth.status ?? initialState.status;
        state.error = incomingAuth.error ?? initialState.error;
      }
    });
  },
});

export const {
  setAccessToken,
  clearAccessToken,
  setAuthLoading,
  setAuthError,
} = authSlice.actions;

export default authSlice.reducer;
