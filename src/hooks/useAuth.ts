import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useCustomAuth = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            },
          });
          setToken(accessToken);
        } catch (e) {
          const err = e as Error;
          console.error(err);
        }
      }
    };

    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return token;
};
