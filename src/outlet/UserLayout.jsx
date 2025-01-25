import { Outlet } from 'react-router';
import Header from '../components/common/Header';

const UserLayout = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="md:px-5  bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
