import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import apiService from './services/apiService';
import { useCustomAuth } from './hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { LoadingStatus } from './features/user/userTypes';
import { setError, startLoading, userLoaded } from './features/user/userSlice';

function App() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  const token = useCustomAuth();
  const dispatch = useDispatch<AppDispatch>();

  const userInfo = useSelector((state: RootState) => state.user.data);
  const isUserLoading =
    useSelector((state: RootState) => state.user.status) ===
    LoadingStatus.Loading;

  useEffect(() => {
    const postLogin = async () => {
      if (isAuthenticated && token) {
        dispatch(startLoading());
        try {
          const updatedUserInfo = await apiService({
            endpoint: 'auth/callback',
            method: 'POST',
          });
          dispatch(userLoaded(updatedUserInfo));
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setError(error.message));
          } else {
            dispatch(setError('An unexpected error occurred'));
          }
        }
      }
    };

    postLogin();
  }, [isAuthenticated, token, dispatch]);

  if (isLoading || isUserLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    <div>
      {isAuthenticated ? (
        <>
          Hello {userInfo?.email || user?.name}
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
