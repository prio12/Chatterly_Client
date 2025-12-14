/* eslint-disable react/prop-types */
import * as React from 'react';
import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketProviderProps {
  children: React.ReactNode;
}

// Create a Context for the Socket
const SocketContext = createContext<Socket | null>(null);
// Provider Component
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

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
