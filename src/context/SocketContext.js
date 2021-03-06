import { createContext, useContext, useEffect } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { useSocket } from '../hooks/useSocket'
import { types } from '../types/types';
import { ChatContext } from './chat/ChatContext';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, connectedSocket, disconnectedSocket } = useSocket('http://localhost:8080');
    const { auth } =useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

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
        dispatch({
          type: types.usersLoaded,
          payload: users
        })
      });
    }, [socket, dispatch]);
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    );
};