import { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaBars } from 'react-icons/fa';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const [isLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="border-b border-gray-200">
        <div className="px-4 sm:px-6">
          <div className="h-16 flex items-center gap-4">
            {/* Menu Button - Categories */}
            <button className="p-2 rounded-lg hover:bg-gray-100 lg:hidden" onClick={onMenuClick}>
              <FaBars className="h-6 w-6 text-gray-600" />
            </button>

            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img
                className="h-8"
                src="https://placehold.co/120x32/4169e1/ffffff?text=BidHub"
                alt="BidHub"
              />
            </a>

            {/* Location & Search - Desktop */}
            <div className="hidden md:flex relative items-center flex-shrink-0">
              <FaMapMarkerAlt className="absolute left-3 text-[#4169e1]" />
              <select className="pl-9 pr-4 py-2 text-gray-700 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1] appearance-none cursor-pointer w-[200px] lg:w-[280px]">
                <option>All Locations</option>
                <option>New York - Main St</option>
                <option>Los Angeles - Market St</option>
                <option>Chicago - Lake Ave</option>
              </select>
            </div>

            <div className="flex-grow relative hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-4 pr-10 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mobile Search Button */}
            <button
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FaSearch className="h-6 w-6 text-gray-600" />
            </button>

            {/* Auth Buttons - Both Mobile & Desktop */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
              {!isLoggedIn && (
                <>
                  <a
                    href="/signin"
                    className="text-gray-700 hover:text-[#4169e1] text-sm font-medium whitespace-nowrap"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="bg-[#4169e1] text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 whitespace-nowrap"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-b border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-4 pr-10 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mobile Location Selector */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4169e1]" />
              <select className="w-full pl-9 pr-4 py-2 text-gray-700 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1] appearance-none cursor-pointer">
                <option>All Locations</option>
                <option>New York - Main St</option>
                <option>Los Angeles - Market St</option>
                <option>Chicago - Lake Ave</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="px-4 sm:px-6">
          <nav className="flex space-x-6 h-12 whitespace-nowrap">
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
