import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const HomePage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.data);

  return (
    <div className="flex justify-center items-center h-screen">
      {userInfo && (
        <p className="text-lg ">
          Hello, <span className="font-semibold">{userInfo.email}</span>
        </p>
      )}
    </div>
  );
};

export default HomePage;
