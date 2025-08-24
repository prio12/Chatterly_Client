import { Outlet } from 'react-router';
import Header from '../components/common/Header';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SocketContext from '../context/SocketContext';

const UserLayout = () => {
  const socket = useContext(SocketContext);
  const { currentUser } = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    if (!socket) return;

    //if a user is logged in register him in the server
    if (currentUser) {
      const handleConnect = () => {
        socket.emit('register', currentUser);
      };

      if (socket.connected) {
        handleConnect();
      } else {
        socket.on('connect', handleConnect);
      }

      return () => {
        socket.off('connect', handleConnect);
      };
    }

    //if current user is not available (logs out) disconnect the socket.io
    if (!currentUser && socket.connected) {
      socket.disconnect();
    }
  }, [socket, currentUser]);

  return (
    <div className="relative">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="md:px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
