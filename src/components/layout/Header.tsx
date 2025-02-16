import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch, FaBars, FaBell, FaUser } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notificationCount] = useState(1); // This will be dynamic later

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
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8"
                src="https://placehold.co/120x32/4169e1/ffffff?text=BidHub"
                alt="BidHub"
              />
            </Link>

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

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
              {isAuthenticated ? (
                <>
                  {/* Desktop Menu Items */}
                  <div className="hidden md:flex items-center gap-8">
                    <Link
                      to="/my-bids"
                      className="text-gray-700 hover:text-[#4169e1] text-sm font-medium"
                    >
                      My Bids
                    </Link>
                    <Link
                      to="/my-wins"
                      className="text-gray-700 hover:text-[#4169e1] text-sm font-medium"
                    >
                      My Wins
                    </Link>
                    <Link
                      to="/wishlist"
                      className="text-gray-700 hover:text-[#4169e1] text-sm font-medium"
                    >
                      Wishlist
                    </Link>
                  </div>

                  {/* Notifications */}
                  <button className="relative p-2">
                    <FaBell className="w-5 h-5 text-gray-700" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {notificationCount}
                      </span>
                    )}
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="p-2">
                      <FaUser className="w-5 h-5 text-gray-700" />
                    </button>

                    {/* User Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        {/* Mobile-only Menu Items */}
                        <div className="md:hidden">
                          <Link
                            to="/my-bids"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            My Bids
                          </Link>
                          <Link
                            to="/my-wins"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            My Wins
                          </Link>
                          <Link
                            to="/wishlist"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Wishlist
                          </Link>
                          <hr className="my-2" />
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            // Handle sign out
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-700 hover:text-[#4169e1] text-sm font-medium whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#4169e1] text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 whitespace-nowrap"
                  >
                    Sign Up
                  </Link>
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
            <Link
              to="/"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              View All
            </Link>
            <Link
              to="/featured"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              Featured
            </Link>
            <Link
              to="/deals"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              Top Deals
            </Link>
            <Link
              to="/ending-soon"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              Ending Soon
            </Link>
            <Link
              to="/trending"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              Trending Now
            </Link>
            <Link
              to="/history"
              className="text-gray-700 hover:text-[#4169e1] text-sm font-medium flex items-center"
            >
              Recently Viewed
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
