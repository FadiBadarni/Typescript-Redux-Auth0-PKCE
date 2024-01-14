import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { LoadingStatus } from './features/user/userTypes';
import { fetchUserInfo } from './features/user/userActions';
import './index.css';
import Navbar from './components/navbar';
import HomePage from './components/navbar/HomePage';
import { useCustomAuth } from './hooks/useAuth';

function App() {
  const { isLoading, error } = useAuth0();
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useCustomAuth();
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserInfo());
    }
  }, [accessToken, dispatch]);

  const isUserLoading =
    useSelector((state: RootState) => state.user.status) ===
    LoadingStatus.Loading;

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
