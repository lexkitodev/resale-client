import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { FaHeart, FaShare, FaSpinner } from 'react-icons/fa';
import { SimilarItems } from '../components/SimilarItems';
import { DocumentTitle } from '../components/common/DocumentTitle';
import { itemService, Item } from '../services/itemService';
import { formatTimeLeft, formatCurrency } from '../utils/formatters';
import { bidService, type BidUpdate } from '../services/bidService';
import { useAuth } from '../hooks/useAuth';

export const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBidding, setIsBidding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentBid, setCurrentBid] = useState<number | null>(null);
  const [totalBids, setTotalBids] = useState(0);

  useEffect(() => {
    const loadItem = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await itemService.getById(Number(id));
        setItem(data);
        setCurrentBid(data.currentBid || data.startPrice);
      } catch (err) {
        setError('Failed to load item');
        console.error('Failed to load item:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadItem();
  }, [id]);

  useEffect(() => {
    if (!item) return;

    const handleBidUpdate = (update: BidUpdate) => {
      console.log('Received bid update:', update);
      setCurrentBid(update.currentBid);
      setTotalBids(update.totalBids);
    };

    bidService.subscribeToBidUpdates(item.id, handleBidUpdate);

    return () => {
      bidService.unsubscribeFromBidUpdates(item.id);
    };
  }, [item]);

  const handleBid = async () => {
    if (!item || !isAuthenticated) {
      setError('Please sign in to place a bid');
      return;
    }

    setError(null);
    setIsBidding(true);

    try {
      const nextBid = (currentBid || item.startPrice) + 1;
      console.log('Attempting to place bid:', { itemId: item.id, amount: nextBid });
      await bidService.placeBid(item.id, nextBid);
      console.log('Bid placed successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to place bid';
      setError(errorMessage);
      console.error('Bid error:', err);
    } finally {
      setIsBidding(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <FaSpinner className="w-8 h-8 animate-spin text-[#4169e1]" />
        </div>
      </Layout>
    );
  }

  if (error || !item) {
    return (
      <Layout>
        <div className="text-red-600 text-center py-20">{error || 'Item not found'}</div>
      </Layout>
    );
  }

  return (
    <>
      <DocumentTitle title={item.title} />
      <Layout showSidebar={false}>
        <div className="mx-auto">
          {/* Back Button */}
          {item.categories[0] && (
            <Link
              to={`/category/${item.categories[0].slug}`}
              className="inline-flex items-center text-gray-600 hover:text-[#4169e1] mb-6"
            >
              ← Back to {item.categories[0].name}
            </Link>
          )}

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Left Column - Image */}
              <div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <h1 className="text-2xl font-medium text-gray-900">{item.title}</h1>
                  <div className="flex gap-3">
                    <button className="p-2 text-gray-500 hover:text-[#4169e1]">
                      <FaHeart className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-[#4169e1]">
                      <FaShare className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {item.description && <p className="text-gray-600">{item.description}</p>}

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Current Bid</div>
                      <div className="text-3xl font-medium">
                        {formatCurrency(currentBid || item?.startPrice || 0)}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm text-gray-500">Retail Price</div>
                      <div className="text-lg text-gray-700">
                        {formatCurrency(item.retailPrice)}{' '}
                        {item.retailPrice > 0 && (
                          <span className="text-green-600">
                            (
                            {Math.round(
                              ((item.retailPrice - item.startPrice) / item.retailPrice) * 100
                            )}
                            % off)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">Time left</div>
                    <div className="text-sm text-gray-500">
                      {formatTimeLeft(new Date(item.endTime))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">{totalBids} bids</div>

                  <button
                    onClick={handleBid}
                    disabled={isBidding || !isAuthenticated}
                    className="w-full bg-[#4169e1] text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isBidding ? (
                      <FaSpinner className="w-5 h-5 animate-spin mx-auto" />
                    ) : !isAuthenticated ? (
                      'Sign in to bid'
                    ) : (
                      `Bid ${formatCurrency((currentBid || item?.startPrice || 0) + 1)}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Items */}
          <div className="mt-8">
            <SimilarItems category="pet-supplies" currentItemId={Number(id)} />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
      </Layout>
    </>
  );
};
