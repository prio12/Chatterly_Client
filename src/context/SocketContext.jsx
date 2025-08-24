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
    // Create the socket connection
    const newSocket = io('http://localhost:5000', {
      path: '/socket.io/',
      transports: ['websocket'],
      reconnection: false, // Enable auto reconnection
      reconnectionAttempts: 5, // Max attempts for reconnection
      reconnectionDelay: 1000, // Time between reconnection attempts in ms
      reconnectionDelayMax: 5000, // Max delay between reconnections
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
