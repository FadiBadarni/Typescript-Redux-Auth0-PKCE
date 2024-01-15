import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { UserState } from './userTypes';
import { fetchUserInfo } from './userActions';
import { LoadingStatus, RehydrateAction } from 'features/common/commonTypes';

const initialState: UserState = {
  data: null,
  status: LoadingStatus.Idle,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.status = action.payload
        ? LoadingStatus.Succeeded
        : LoadingStatus.Failed;
    },

    clearUser: (state) => {
      state.data = null;
      state.status = LoadingStatus.Idle;
    },

    setLoading: (state, action) => {
      state.status = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.data = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message || 'Failed to fetch user info';
      })
      .addCase(REHYDRATE, (state, action: RehydrateAction) => {
        const incomingUser = action.payload?.user;
        if (incomingUser) {
          state.data = incomingUser.data;
          state.status = incomingUser.status ?? initialState.status;
          state.error = incomingUser.error ?? initialState.error;
        }
      });
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
