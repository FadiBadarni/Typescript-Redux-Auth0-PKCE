import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCustomAuth } from './hooks/useAuth';
import apiService from './services/apiService';

function App() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  const token = useCustomAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const products = await apiService({
            endpoint: 'products',
            method: 'GET',
            token: token,
          });

          console.log('Fetched products:', products);
        } catch (err) {
          console.error('Error fetching products:', err);
        }
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

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
