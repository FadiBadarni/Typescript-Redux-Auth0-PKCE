import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCustomAuth } from './hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { LoadingStatus } from './features/user/userTypes';
import { fetchUserInfo } from './features/user/userActions';
import './index.css';

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
    if (isAuthenticated && token) {
      dispatch(fetchUserInfo());
    }
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Log out
          </button>
        </>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue
-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log in
        </button>
      )}
    </div>
  );
}

export default App;
