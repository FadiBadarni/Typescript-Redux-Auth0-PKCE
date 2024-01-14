import { Suspense, useEffect } from 'react';
import { fetchUserInfo } from './features/user/userActions';
import './index.css';
import Navbar from './components/navbar';
import HomePage from './components/navbar/HomePage';
import { useCustomAuth } from './hooks/useAuth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './store/useAppDispatch';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = useCustomAuth();

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserInfo());
    }
  }, [accessToken, dispatch]);

  return (
    <Suspense fallback="loading">
      <Router>
        <div className="flex flex-col h-screen bg-gray-900">
          <Navbar />
          <div className="flex-grow p-4 overflow-auto text-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
