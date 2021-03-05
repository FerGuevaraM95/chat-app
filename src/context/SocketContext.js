import { createContext, useContext, useEffect } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { useSocket } from '../hooks/useSocket'

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, connectedSocket, disconnectedSocket } = useSocket('http://localhost:8080');
    const { auth } =useContext(AuthContext);

    useEffect(() => {
      if(auth.logged) {
        connectedSocket();
      };
    }, [auth, connectedSocket]);

    useEffect(() => {
      if(!auth.logged) {
        disconnectedSocket();
      };
    }, [auth, disconnectedSocket]);

    // Escuchar los cambios en los usuarios conectados
    useEffect(() => {
      socket?.on('list-users', (users) => {
        console.log(users);
      });
    }, [socket]);
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    );
};