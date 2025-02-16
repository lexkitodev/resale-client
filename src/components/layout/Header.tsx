import { useState } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

export const Header = () => {
  const [isLoggedIn] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="border-b border-gray-200">
        <div className="px-6">
          <div className="h-16 flex items-center gap-4">
            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img
                className="h-8"
                src="https://placehold.co/120x32/4169e1/ffffff?text=BidHub"
                alt="BidHub"
              />
            </a>

            {/* Location Selector */}
            <div className="relative flex items-center">
              <FaMapMarkerAlt className="absolute left-3 text-[#4169e1]" />
              <select className="pl-9 pr-4 py-2 text-gray-700 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1] appearance-none cursor-pointer w-[280px]">
                <option>All Locations</option>
                <option>New York - Main St</option>
                <option>Los Angeles - Market St</option>
                <option>Chicago - Lake Ave</option>
              </select>
            </div>

            {/* Search Bar */}
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-4 pr-10 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {!isLoggedIn && (
                <>
                  <a
                    href="/signin"
                    className="text-gray-700 hover:text-[#4169e1] text-sm font-medium"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="bg-[#4169e1] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8 h-12">
            <a
              href="/"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              View All
            </a>
            <a
              href="/featured"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              Featured
            </a>
            <a
              href="/deals"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              Top Deals
            </a>
            <a
              href="/ending-soon"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              Ending Soon
            </a>
            <a
              href="/trending"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              Trending Now
            </a>
            <a
              href="/history"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              Recently Viewed
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
