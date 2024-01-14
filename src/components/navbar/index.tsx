import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { RootState } from '../../store/store';
import { clearUser } from '../../features/user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { clearAccessToken } from '../../features/auth/authReducer';

const Navbar: React.FC = () => {
  const { loginWithRedirect, logout } = useAuth0();
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    dispatch(clearAccessToken());
    dispatch(clearUser());
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-opacity-80 flex-none transition-colors duration-500 border-b border-gray-700 bg-gray-900">
      <div className="max-w-8xl mx-auto">
        <div className="py-4 lg:px-8 mx-4 lg:mx-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white hover:text-teal-400 cursor-pointer">
              My Store
            </h1>
            <div>
              {userData ? (
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Log out
                </button>
              ) : (
                <button
                  onClick={() => loginWithRedirect()}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
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
