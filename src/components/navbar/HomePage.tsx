import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const HomePage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.data);

  return <div>{userInfo && <p>Hello {userInfo.email}</p>}</div>;
};

export default HomePage;
