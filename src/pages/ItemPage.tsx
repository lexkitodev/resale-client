import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { FaHeart, FaShare } from 'react-icons/fa';
import { SimilarItems } from '../components/SimilarItems';
import { DocumentTitle } from '../components/common/DocumentTitle';

interface PickupTime {
  day: string;
  hours: string;
}

const PICKUP_TIMES: PickupTime[] = [
  { day: 'Monday, Mar 4', hours: '10:00AM - 04:30PM' },
  { day: 'Tuesday, Mar 5', hours: '10:00AM - 04:30PM' },
  { day: 'Wednesday, Mar 6', hours: '10:00AM - 04:30PM' },
  { day: 'Thursday, Mar 7', hours: '09:00AM - 03:00PM' },
];

export const ItemPage = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Main product image and thumbnails
  const mainImage = 'https://picsum.photos/800/800?random=1';
  const thumbnails = [
    mainImage,
    'https://picsum.photos/800/800?random=2',
    'https://picsum.photos/800/800?random=3',
    'https://picsum.photos/800/800?random=4',
  ];

  return (
    <>
      <DocumentTitle title={`Item ${id}`} />
      <Layout showSidebar={false}>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-lg overflow-hidden">
                <img
                  src={thumbnails[currentImageIndex]}
                  alt="Royal Canin Indoor Adult Dry Cat Food"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-2">
                {thumbnails.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-[#4169e1]' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <h1 className="text-2xl font-medium text-gray-900">
                  Premium Indoor Pet Food, Large Size Package
                </h1>
                <div className="flex gap-3">
                  <button className="p-2 text-gray-500 hover:text-[#4169e1]">
                    <FaHeart className="w-6 h-6" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-[#4169e1]">
                    <FaShare className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Current Bid</div>
                      <div className="text-3xl font-medium">$35.00</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm text-gray-500">Retail Price</div>
                      <div className="text-lg text-gray-700">
                        $59.99 <span className="text-green-600">(42% off)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">Time left</div>
                    <div className="text-sm text-gray-500">3 Bidders • 15 Bids</div>
                  </div>

                  <button className="w-full bg-[#4169e1] text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700">
                    Bid $40.00
                  </button>
                </div>
              </div>

              {/* Pickup Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">Pickup Details</h2>
                <div className="text-sm text-gray-600 mb-4">
                  123 Main Street, New York, NY 10001
                </div>
                <div className="space-y-2">
                  {PICKUP_TIMES.map((time, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div className="text-gray-600">{time.day}</div>
                      <div className="text-gray-900">{time.hours}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">Product Details</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">SKU</div>
                  <div className="text-gray-900">PRD10254789</div>
                  <div className="text-gray-600">Item ID</div>
                  <div className="text-gray-900">BH7890123</div>
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
