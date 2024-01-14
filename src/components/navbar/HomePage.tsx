import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const HomePage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.data);

  return (
    <div className="flex justify-center items-center h-screen">
      {userInfo && (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Hello tailwind</h1>
          <p className="text-lg text-white">
            Hello, <span className="font-semibold">{userInfo.email}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
