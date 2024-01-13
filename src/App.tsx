import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCustomAuth } from './hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { LoadingStatus } from './features/user/userTypes';
import { fetchUserInfo } from './features/user/userActions';
import './index.css';
import Navbar from './components/navbar';
import HomePage from './components/navbar/HomePage';

function App() {
  const { isLoading, isAuthenticated, error } = useAuth0();
  const token = useCustomAuth();
  const dispatch = useDispatch<AppDispatch>();
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
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
