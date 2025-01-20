import { Outlet } from 'react-router';
import Header from '../components/common/Header';

const UserLayout = () => {
  return (
    <div>
      <Header />
      <div className="md:p-5 px-2 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
