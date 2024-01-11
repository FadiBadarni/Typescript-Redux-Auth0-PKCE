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

export interface UserData {
  auth0Id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
  locale: string | null;
  emailVerified: boolean;
  roles: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserState extends CommonState<UserData | null> {}
