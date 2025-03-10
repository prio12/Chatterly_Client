import { Outlet } from 'react-router';
import Header from '../components/common/Header';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SocketContext from '../context/SocketContext';

const UserLayout = () => {
  const socket = useContext(SocketContext);
  const { currentUser } = useSelector((state) => state.loggedInUser);

  //registering the user with firebase user Uid  when he is online for socket.io

  useEffect(() => {
    // socket.emit('register', currentUser);
    if (socket.connected) {
      socket.emit('register', currentUser);
    }
  }, [currentUser, socket]);

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
