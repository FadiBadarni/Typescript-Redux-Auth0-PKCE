import { Action } from '@reduxjs/toolkit';
import { AuthState } from 'features/auth/authReducer';
import { UserState } from 'features/user/userTypes';
import { REHYDRATE } from 'redux-persist';

export interface CommonState<T> {
  data: T;
  status: LoadingStatus;
  error: string | null;
}

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

interface RehydratePayload {
  auth?: AuthState;
  user?: UserState;
}

export interface RehydrateAction extends Action<typeof REHYDRATE> {
  payload?: RehydratePayload;
}
