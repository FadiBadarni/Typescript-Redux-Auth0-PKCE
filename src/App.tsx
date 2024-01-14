import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchUserInfo } from './features/user/userActions';
import './index.css';
import Navbar from './components/navbar';
import HomePage from './components/navbar/HomePage';
import { useCustomAuth } from './hooks/useAuth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useCustomAuth();

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserInfo());
    }
  }, [accessToken, dispatch]);

  return (
    <Suspense fallback="loading">
      <Router>
        <Navbar />
        <div style={{ flexGrow: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
