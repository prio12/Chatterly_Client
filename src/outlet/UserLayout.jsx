import { Outlet } from 'react-router';

const UserLayout = () => {
  return (
    <div>
      <h1>this is header</h1>
      <Outlet />
    </div>
  );
};

export default UserLayout;
