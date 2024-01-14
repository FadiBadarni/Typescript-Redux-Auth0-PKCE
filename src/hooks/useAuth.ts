import { useAuth0 } from '@auth0/auth0-react';
import { setAccessToken } from 'features/auth/authReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';

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
      } catch (error) {
        console.error('Error fetching access token', error);
      }
    };

    if (!accessToken) {
      fetchAccessToken();
    }
  }, [getAccessTokenSilently, dispatch, accessToken]);

  return accessToken;
};
