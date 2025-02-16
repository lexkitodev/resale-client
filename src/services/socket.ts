import { io, Socket } from 'socket.io-client';
import { HealthCheckResponse } from './healthCheck';

class SocketService {
  private socket: Socket | null = null;
  private readonly url: string;

  constructor() {
    console.log(import.meta.env.VITE_API_URL);
    this.url = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  }

  connect() {
    if (!this.socket) {
      this.socket = io(this.url);
      this.socket.on('connect', () => {
        console.log('Connected to server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  checkHealth() {
    if (this.socket) {
      this.socket.emit('checkHealth');
    }
  }

  onHealthUpdate(callback: (data: HealthCheckResponse) => void) {
    if (this.socket) {
      this.socket.on('healthUpdate', callback);
    }
  }
}

export const socketService = new SocketService();
