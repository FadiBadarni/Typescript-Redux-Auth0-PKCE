import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useCustomAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'store/useAppDispatch';
import { fetchUserInfo } from 'features/user/userActions';
import Navbar from 'components/navbar';
import HomePage from 'components/home/HomePage';

import './index.css';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = useCustomAuth();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserInfo());
    }
  }, [accessToken, dispatch]);

  return (
    <Suspense fallback="loading">
      <Router>
        <div
          className={`flex flex-col h-screen overflow-auto scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-800 ${
            theme === 'dark' ? 'dark' : 'light'
          }`}
        >
          <Navbar />
          <div className="flex-grow p-4">
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
