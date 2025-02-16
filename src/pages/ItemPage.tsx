import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { FaHeart, FaShare } from 'react-icons/fa';
import { SimilarItems } from '../components/SimilarItems';
import { DocumentTitle } from '../components/common/DocumentTitle';
import { itemService, Item } from '../services/itemService';
import { formatTimeLeft, formatCurrency } from '../utils/formatters';
import { FaSpinner } from 'react-icons/fa';

export const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await itemService.getById(Number(id));
        setItem(data);
      } catch (err) {
        setError('Failed to load item');
        console.error('Failed to load item:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadItem();
  }, [id]);

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
                        {formatCurrency(item.currentBid || item.startPrice)}
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

                  <button className="w-full bg-[#4169e1] text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700">
                    Bid {formatCurrency((item.currentBid || item.startPrice) + 1)}
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
      </Layout>
    </>
  );
};
