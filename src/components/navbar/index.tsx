import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faSignInAlt,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { clearUser } from 'features/user/userSlice';
import { clearAccessToken } from 'features/auth/authReducer';
import { RootState } from 'store/store';
import { toggleTheme } from 'features/theme/themeSlice';

const Navbar: React.FC = () => {
  const { loginWithRedirect, logout } = useAuth0();
  const userData = useSelector((state: RootState) => state.user.data);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    dispatch(clearAccessToken());
    dispatch(clearUser());
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-opacity-80 flex-none transition-colors duration-500 border-b border-gray-700 bg-gray-900">
      <div className="max-w-8xl mx-auto">
        <div className="py-3 lg:px-8 mx-4 lg:mx-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white hover:text-teal-400 cursor-pointer">
              My Store
            </h1>
            <div className="flex items-center">
              <button
                onClick={handleToggleTheme}
                className="text-white p-2 rounded-full hover:bg-gray-700 transition duration-300 ease-in-out mr-4 flex items-center"
              >
                {theme === 'light' ? (
                  <FontAwesomeIcon icon={faSun} />
                ) : (
                  <FontAwesomeIcon icon={faMoon} />
                )}
              </button>
              {userData ? (
                <button
                  onClick={handleLogout}
                  className="text-white bg-gray-800 hover:bg-gray-600 font-medium py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Log out
                </button>
              ) : (
                <button
                  onClick={() => loginWithRedirect()}
                  className="text-white bg-gray-800 hover:bg-gray-600 font-medium py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  Log in
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
