import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaUser } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const AuthNav = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [notificationCount] = useState(1); // This will be dynamic later
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await signOut();
      setIsDropdownOpen(false);
      navigate('/signin');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <div className="flex items-center gap-4 md:gap-8">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/my-bids" className="text-gray-700 hover:text-[#4169e1]">
          My Bids
        </Link>
        <Link to="/my-wins" className="text-gray-700 hover:text-[#4169e1]">
          My Wins
        </Link>
        <Link to="/wishlist" className="text-gray-700 hover:text-[#4169e1]">
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
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-2">
          <FaUser className="w-5 h-5 text-gray-700" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            {/* Mobile-only links */}
            <div className="md:hidden">
              <Link
                to="/my-bids"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                My Bids
              </Link>
              <Link
                to="/my-wins"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                My Wins
              </Link>
              <Link
                to="/wishlist"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Wishlist
              </Link>
              <hr className="my-2" />
            </div>
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
