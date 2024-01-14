import { createSlice } from '@reduxjs/toolkit';
import { UserState, LoadingStatus } from './userTypes';
import { REHYDRATE } from 'redux-persist';
import { fetchUserInfo } from './userActions';

interface RehydrateAction {
  type: typeof REHYDRATE;
  payload?: { user: UserState };
}

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
      // Handler for rehydration action from redux-persist
      .addCase(REHYDRATE, (state, action: RehydrateAction) => {
        if (action.payload?.user) {
          state.data = action.payload.user.data;
          state.status = action.payload.user.status;
        }
      });
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
