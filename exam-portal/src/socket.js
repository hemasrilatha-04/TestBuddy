import { io } from 'socket.io-client';

let socketInstance = null;

export function getSocket() {
  if (!socketInstance) {
    socketInstance = io('http://localhost:8080', {
      transports: ['websocket'],
    });
  }
  return socketInstance;
}

export function registerRole(role) {
  const s = getSocket();
  s.emit('register_role', { role });
}



