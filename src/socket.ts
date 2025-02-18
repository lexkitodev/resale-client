import { io } from 'socket.io-client';
import { tokenService } from './services/tokenService';

const API_URL = import.meta.env.VITE_API_URL;

export const socket = io(API_URL, {
  autoConnect: false,
  withCredentials: true,
  auth: {
    token: tokenService.getToken(),
  },
});

// Connect if token exists
if (tokenService.hasToken()) {
  socket.connect();
}

// Add socket event listeners for debugging
socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});

// Export reconnect function for manual reconnection if needed
export const reconnectSocket = () => {
  socket.connect();
};
