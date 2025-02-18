import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { formatTimeLeft, formatCurrency } from '../utils/formatters';
import { Item } from '../services/itemService';
import { bidService, type BidUpdate } from '../services/bidService';
import { useAuth } from '../hooks/useAuth';

interface AuctionGridProps {
  items: Item[];
}

export const AuctionGrid = ({ items }: AuctionGridProps) => {
  const { isAuthenticated } = useAuth();
  const [biddingItems, setBiddingItems] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [currentBids, setCurrentBids] = useState<Map<number, number>>(
    new Map(items.map((item) => [item.id, item.currentBid || item.startPrice]))
  );
  const [totalBids, setTotalBids] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    // Subscribe to bid updates for all items
    items.forEach((item) => {
      bidService.subscribeToBidUpdates(item.id, (update: BidUpdate) => {
        setCurrentBids((prev) => new Map(prev).set(update.itemId, update.currentBid));
        setTotalBids((prev) => new Map(prev).set(update.itemId, update.totalBids));
      });
    });

    // Cleanup subscriptions
    return () => {
      items.forEach((item) => {
        bidService.unsubscribeFromBidUpdates(item.id);
      });
    };
  }, [items]);

  const handleBid = async (item: Item) => {
    if (!isAuthenticated) {
      setError('Please sign in to place a bid');
      return;
    }

    setBiddingItems((prev) => new Set(prev).add(item.id));
    setError(null);

    try {
      const currentBid = currentBids.get(item.id) || item.startPrice;
      const nextBid = currentBid + 1;
      await bidService.placeBid(item.id, nextBid);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to place bid';
      setError(errorMessage);
      console.error('Bid error:', err);
    } finally {
      setBiddingItems((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => {
        const currentBid = currentBids.get(item.id) || item.startPrice;
        const numBids = totalBids.get(item.id) || 0;

        return (
          <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Link to={`/item/${item.id}`} className="block aspect-square overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </Link>

            <div className="p-4 space-y-2">
              <Link to={`/item/${item.id}`} className="block">
                <h3 className="text-lg font-medium text-gray-900 hover:text-[#4169e1]">
                  {item.title}
                </h3>
              </Link>

              <div className="flex justify-between items-baseline">
                <div>
                  <div className="text-sm text-gray-500">Current Bid</div>
                  <div className="text-xl font-medium">{formatCurrency(currentBid)}</div>
                  <div className="text-sm text-gray-500">{numBids} bids</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Time left</div>
                  <div className="text-sm text-gray-900">
                    {formatTimeLeft(new Date(item.endTime))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBid(item)}
                disabled={biddingItems.has(item.id) || !isAuthenticated}
                className="w-full bg-[#4169e1] text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {biddingItems.has(item.id) ? (
                  <FaSpinner className="w-4 h-4 animate-spin mx-auto" />
                ) : !isAuthenticated ? (
                  'Sign in to bid'
                ) : (
                  `Bid ${formatCurrency(currentBid + 1)}`
                )}
              </button>
            </div>
          </div>
        );
      })}

      {error && (
        <div className="fixed bottom-4 right-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
