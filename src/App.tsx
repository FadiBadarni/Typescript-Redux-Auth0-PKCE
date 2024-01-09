import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosError } from 'axios';

const callApi = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Error data:', err.response.data);
      console.error('Error status:', err.response.status);
    } else {
      console.error('Error message:', err.message);
    }
  }
};

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: 'https://fadi-store.com/',
            },
          });
          setToken(accessToken);
          callApi(accessToken);
        } catch (e) {
          const err = e as Error;
          console.error(err);
        }
      }
    };

    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          Hello {user?.name}
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log out
          </button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
    </div>
  );
}

export default App;
