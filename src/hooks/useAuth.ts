import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../features/auth/authReducer';

export const useCustomAuth = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            },
          });
          dispatch(setAccessToken(accessToken));
        } catch (e) {
          const err = e as Error;
          console.error(err);
        }
      }
    };

    fetchAccessToken();
  }, [isAuthenticated, getAccessTokenSilently, dispatch]);

  return null;
};
