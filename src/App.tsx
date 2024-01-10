import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import apiService from './services/apiService';
import { useCustomAuth } from './hooks/useAuth';

function App() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  const token = useCustomAuth();

  useEffect(() => {
    const postLogin = async () => {
      if (isAuthenticated && token) {
        try {
          // Call the login/callback endpoint
          await apiService({
            endpoint: 'login/callback',
            method: 'POST',
            token,
          });
          console.log('User registration or retrieval completed');
        } catch (err) {
          console.error('Error in user registration:', err);
        }
      }
    };

    const fetchData = async () => {
      if (isAuthenticated && token) {
        try {
          const products = await apiService({
            endpoint: 'products',
            method: 'GET',
            token,
          });
          console.log('Fetched products:', products);
        } catch (err) {
          console.error('Error fetching products:', err);
        }
      }
    };

    postLogin();
    fetchData();
  }, [isAuthenticated, token]);

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
