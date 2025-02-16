interface AuctionItemProps {
  title: string;
  image: string;
  currentBid: number;
  retailPrice: number;
  timeLeft: string;
  bids: number;
}

export const AuctionItem = ({
  title,
  image,
  currentBid,
  retailPrice,
  timeLeft,
  bids,
}: AuctionItemProps) => {
  const nextBid = currentBid + 0.5; // Next bid is always $0.50 more than current

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="relative pb-[75%] sm:pb-[100%]">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate mb-2">{title}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="space-y-2">
            <div className="text-gray-600">Current Bid</div>
            <div className="text-gray-600">Retail Price</div>
          </div>
          <div className="space-y-2 text-right">
            <div className="font-medium">${currentBid.toFixed(2)}</div>
            <div className="font-medium">${retailPrice.toFixed(2)}</div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>{timeLeft}</span>
          <span>{bids} bids</span>
        </div>
        <button
          className="w-full bg-[#4169e1] text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          onClick={() => alert(`Placing bid of $${nextBid.toFixed(2)}`)}
        >
          Bid ${nextBid.toFixed(2)}
        </button>
      </div>
    </div>
  );
};
