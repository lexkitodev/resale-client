import { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { AuctionGrid } from '../components/AuctionGrid';
import { itemService, Item } from '../services/itemService';
import { FaSpinner } from 'react-icons/fa';
import { DocumentTitle } from '../components/common/DocumentTitle';

export const HomePage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setIsLoading(true);
        const data = await itemService.getLatest(1);
        setItems(data.items || []);
        setHasMore(data.hasMore);
      } catch (err) {
        setError('Failed to load items');
        console.error('Failed to load items:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  const loadMore = async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await itemService.getLatest(nextPage);
      setItems((prevItems) => [...prevItems, ...(data.items || [])]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (err) {
      console.error('Failed to load more items:', err);
    } finally {
      setIsLoadingMore(false);
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

  if (error) {
    return (
      <Layout>
        <div className="text-red-600 text-center py-20">{error}</div>
      </Layout>
    );
  }

  return (
    <>
      <DocumentTitle title="Home" />
      <Layout>
        <div className="space-y-4">
          <h1 className="text-2xl font-medium text-gray-900">Latest Items</h1>

          {/* Auction Grid */}
          <AuctionGrid items={items} />

          {/* Show More Button */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                disabled={isLoadingMore}
                className="bg-[#4169e1] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <FaSpinner className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  'Show More'
                )}
              </button>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};
