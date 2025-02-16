import { AuctionItem } from './AuctionItem';

const MOCK_ITEMS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Sample Auction Item ${i + 1}`,
  image: `https://picsum.photos/400/400?random=${i}`,
  currentBid: Math.random() * 100 + 10,
  retailPrice: Math.random() * 500 + 100,
  timeLeft: '2h 15m',
  bids: Math.floor(Math.random() * 20),
}));

export const AuctionGrid = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-8">
        {MOCK_ITEMS.map((item) => (
          <AuctionItem key={item.id} {...item} />
        ))}
      </div>
      <div className="text-center">
        <button className="bg-[#4169e1] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-blue-700">
          Show More
        </button>
      </div>
    </div>
  );
};
