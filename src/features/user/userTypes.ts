import { CommonState } from 'features/common/commonTypes';

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
