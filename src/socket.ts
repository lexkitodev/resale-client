import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const socket = io(API_URL, {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});
