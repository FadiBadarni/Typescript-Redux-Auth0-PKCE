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
