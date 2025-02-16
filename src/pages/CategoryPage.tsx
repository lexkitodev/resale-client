import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { AuctionGrid } from '../components/AuctionGrid';

type SortOption =
  | 'Newly Posted'
  | 'Highest Bid'
  | 'Lowest Bid'
  | 'Ending Soonest'
  | 'Retail Price High to Low'
  | 'Retail Price Low to High';

export const CategoryPage = () => {
  const [sortBy, setSortBy] = useState<SortOption>('Ending Soonest');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  return (
    <Layout showSidebar>
      <div className="space-y-4">
        {/* Category Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium text-gray-900">Pet Supplies</h1>

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
        <AuctionGrid />
      </div>
    </Layout>
  );
};
