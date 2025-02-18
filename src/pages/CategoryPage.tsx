import { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { AuctionGrid } from '../components/AuctionGrid';
import { useParams } from 'react-router-dom';
import { DocumentTitle } from '../components/common/DocumentTitle';
import { itemService, Item } from '../services/itemService';
import { useCategories } from '../hooks/useCategories';
import { FaSpinner } from 'react-icons/fa';

type SortOption =
  | 'Newly Posted'
  | 'Highest Bid'
  | 'Lowest Bid'
  | 'Ending Soonest'
  | 'Retail Price High to Low'
  | 'Retail Price Low to High';

export const CategoryPage = () => {
  const { category: categorySlug } = useParams<{ category: string }>();
  const { categories = [] } = useCategories();
  const [sortBy, setSortBy] = useState<SortOption>('Ending Soonest');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Find the current category from the categories list
  const currentCategory = categories?.find((cat) => cat.slug === categorySlug);
  const categoryName = currentCategory?.name || 'Category';

  useEffect(() => {
    const loadItems = async () => {
      if (!categorySlug) return;

      setIsLoading(true);
      setPage(1);
      try {
        const data = await itemService.getByCategory(categorySlug);
        console.log('Received items:', data);
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
  }, [categorySlug]);

  const loadMore = async () => {
    if (!categorySlug || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await itemService.getByCategory(categorySlug, nextPage);
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
      <DocumentTitle title={categoryName} />
      <Layout showSidebar>
        <div className="space-y-4">
          {/* Category Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium text-gray-900">{categoryName}</h1>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="pl-4 pr-10 py-2 text-gray-700 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1] appearance-none cursor-pointer"
              >
                <option>Newly Posted</option>
                <option>Highest Bid</option>
                <option>Lowest Bid</option>
                <option>Ending Soonest</option>
                <option>Retail Price High to Low</option>
                <option>Retail Price Low to High</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex flex-wrap gap-4">
              {/* Price Range */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Price:</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-24 px-3 py-1.5 text-gray-700 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-24 px-3 py-1.5 text-gray-700 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
                />
              </div>

              {/* Clear Filters */}
              <button
                className="text-[#4169e1] text-sm font-medium hover:text-blue-700"
                onClick={() => {
                  setPriceMin('');
                  setPriceMax('');
                }}
              >
                Clear
              </button>
            </div>
          </div>

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
