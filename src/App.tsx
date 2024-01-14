import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { LoadingStatus } from './features/user/userTypes';
import { fetchUserInfo } from './features/user/userActions';
import './index.css';
import Navbar from './components/navbar';
import HomePage from './components/navbar/HomePage';
import { setAccessToken } from './features/auth/authReducer';

function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently, error } =
    useAuth0();
  const dispatch = useDispatch<AppDispatch>();
  const isUserLoading =
    useSelector((state: RootState) => state.user.status) ===
    LoadingStatus.Loading;

  useEffect(() => {
    const fetchAndSetToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            },
          });
          dispatch(setAccessToken(accessToken));
        } catch (e) {
          console.error('Error fetching access token', e);
        }
      }
    };

    fetchAndSetToken();
  }, [isAuthenticated, getAccessTokenSilently, dispatch]);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  if (isLoading || isUserLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    <div>
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
