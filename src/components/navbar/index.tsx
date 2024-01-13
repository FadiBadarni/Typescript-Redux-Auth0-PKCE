import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { RootState } from '../../store/store';
import { clearUser } from '../../features/user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const { loginWithRedirect, logout } = useAuth0();
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    dispatch(clearUser());
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-white">My Store</h1>
      </div>
      <div>
        {userData ? (
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Log out
          </button>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Log in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
