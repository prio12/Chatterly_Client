import { Outlet } from 'react-router';
import Header from '../components/common/Header';

const UserLayout = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="md:px-5  ">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
