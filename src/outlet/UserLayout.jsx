import { Outlet } from 'react-router';
import Header from '../components/common/Header';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SocketContext from '../context/SocketContext';

const UserLayout = () => {
  const socket = useContext(SocketContext);
  const { currentUser } = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    console.log('before !socket');
    if (!socket) return;
    console.log('after socket');

    if (currentUser) {
      console.log('if it enters in this if block just after login');
      //declaring handler to register the user in server with uid
      const handleConnect = () => {
        socket.emit('register', currentUser);
      };

      //connecting the socket first in case it's disconnected
      if (!socket.connected) socket.connect();
      //listening to the connect event then passing the handler ref to register the user
      socket.on('connect', handleConnect);

      return () => {
        socket.off('connect', handleConnect);
      };
    }

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
