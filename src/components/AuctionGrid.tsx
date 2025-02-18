import { Link } from 'react-router-dom';
import { Item } from '../services/itemService';
import { formatTimeLeft, formatCurrency } from '../utils/formatters';
import { Component, ErrorInfo } from 'react';

interface AuctionGridProps {
  items?: Item[];
}

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AuctionGrid error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-600">Something went wrong displaying the items.</div>;
    }

    return this.props.children;
  }
}

export const AuctionGrid = ({ items = [] }: AuctionGridProps) => {
  console.log('AuctionGrid items:', items);
  return (
    <ErrorBoundary>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/item/${item.id}`}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <div className="aspect-square">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Current Bid</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(item.currentBid || item.startPrice)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Retail Price</span>
                  <span className="text-gray-700">{formatCurrency(item.retailPrice)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time Left</span>
                  <span className="text-gray-700">{formatTimeLeft(new Date(item.endTime))}</span>
                </div>
              </div>

              <button className="w-full bg-[#4169e1] text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                Bid {formatCurrency((item.currentBid || item.startPrice) + 1)}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </ErrorBoundary>
  );
};
