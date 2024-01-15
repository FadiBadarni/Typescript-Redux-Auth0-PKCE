import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setupInterceptors } from 'services/axiosService';
import { store } from 'store/store';

export const useSetupAxiosInterceptors = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (getAccessTokenSilently) {
      setupInterceptors(store, getAccessTokenSilently);
    }
  }, [getAccessTokenSilently]);
};
