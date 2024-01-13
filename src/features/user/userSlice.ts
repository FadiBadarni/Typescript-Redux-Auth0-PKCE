import { createSlice } from '@reduxjs/toolkit';
import { UserState, LoadingStatus } from './userTypes';

export const initialState: UserState = {
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
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
