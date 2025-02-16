import { AuctionItem } from './AuctionItem';

interface SimilarItemsProps {
  category: string;
  currentItemId: number;
}

export const SimilarItems = ({ category, currentItemId }: SimilarItemsProps) => {
  const items = Array.from({ length: 5 }, (_, i) => ({
    id: i + 100,
    sku: `SKU${String(i + 100).padStart(4, '0')}`,
    title: `Similar ${category} Item ${i + 1}`,
    image: `https://picsum.photos/400/400?random=${i + 50}`,
    currentBid: Math.random() * 100 + 10,
    retailPrice: Math.random() * 500 + 100,
    timeLeft: '2h 15m',
    bids: Math.floor(Math.random() * 20),
  }))
    .filter((item) => item.id !== currentItemId)
    .slice(0, 5);

  return (
    <div className="mt-12">
      <h2 className="text-xl font-medium mb-6">Similar {category} Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {items.map((item) => (
          <AuctionItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
