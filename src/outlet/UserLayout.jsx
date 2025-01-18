import { Outlet } from 'react-router';
import Header from '../components/common/Header';

const UserLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default UserLayout;
