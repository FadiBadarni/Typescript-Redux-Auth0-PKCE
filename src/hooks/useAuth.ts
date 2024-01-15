import { useAuth0 } from '@auth0/auth0-react';
import {
  setAccessToken,
  clearAccessToken,
  setAuthError,
} from 'features/auth/authReducer';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface DecodedToken {
  exp: number;
}

export const useCustomAuth = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          },
        });
        dispatch(setAccessToken(token));
      } catch (error: any) {
        console.error('Error fetching access token', error);
        dispatch(clearAccessToken());
        dispatch(setAuthError('Failed to fetch access token'));
      }
    };

    const isTokenExpired = (token: string): boolean => {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.exp < Date.now() / 1000;
      } catch (error) {
        console.error('Error decoding access token', error);
        return true;
      }
    };

    if (!accessToken || isTokenExpired(accessToken)) {
      fetchAccessToken();
    }
  }, [getAccessTokenSilently, dispatch, accessToken]);

  return accessToken;
};
