/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create a Context for the Socket
const SocketContext = createContext(null);

// Provider Component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // socket connection
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      path: '/socket.io/',
      transports: ['websocket'],
      reconnection: false,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    // Set the socket instance
    setSocket(newSocket);

    // Cleanup the socket connection when the component unmounts
    return () => {
      if (newSocket.connected) {
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
