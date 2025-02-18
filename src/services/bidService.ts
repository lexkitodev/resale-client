import { socket } from '../socket';

export interface Bid {
  id: number;
  itemId: number;
  amount: number;
  userId: number;
  createdAt: string;
}

export interface BidUpdate {
  itemId: number;
  currentBid: number;
  totalBids: number;
}

export class BidService {
  private bidUpdateCallbacks: Map<number, ((bid: BidUpdate) => void)[]> = new Map();

  constructor() {
    socket.on('bidUpdate', (update: BidUpdate) => {
      console.log('Received bid update:', update);
      const callbacks = this.bidUpdateCallbacks.get(update.itemId) || [];
      callbacks.forEach((callback) => callback(update));
    });

    socket.on('bidError', (error: { message: string }) => {
      console.error('Bid error:', error.message);
      throw new Error(error.message);
    });
  }

  async placeBid(itemId: number, amount: number): Promise<void> {
    if (!socket.connected) {
      console.error('Socket not connected');
      throw new Error('Socket not connected');
    }

    console.log('Bid attempt:', {
      itemId,
      amount,
      socketConnected: socket.connected,
      socketId: socket.id,
    });

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.error('Bid timeout');
        reject(new Error('Bid timeout'));
      }, 5000);

      socket.emit('placeBid', { itemId, amount });
      console.log('Bid request emitted');

      const handleSuccess = () => {
        clearTimeout(timeout);
        console.log('Bid success received');
        resolve();
      };

      const handleError = (error: { message: string }) => {
        clearTimeout(timeout);
        console.error('Bid error received:', error);
        reject(new Error(error.message));
      };

      socket.once('bidSuccess', handleSuccess);
      socket.once('bidError', handleError);
    });
  }

  subscribeToBidUpdates(itemId: number, callback: (bid: BidUpdate) => void) {
    const callbacks = this.bidUpdateCallbacks.get(itemId) || [];
    callbacks.push(callback);
    this.bidUpdateCallbacks.set(itemId, callbacks);
    socket.emit('subscribeToBids', itemId);
  }

  unsubscribeFromBidUpdates(itemId: number) {
    this.bidUpdateCallbacks.delete(itemId);
    socket.emit('unsubscribeFromBids', itemId);
  }
}

export const bidService = new BidService();
