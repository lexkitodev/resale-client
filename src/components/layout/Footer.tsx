export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Mobile App</h3>
            {/* Add app store buttons here */}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="hover:text-gray-300">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-300">
                  Terms
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-gray-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/support" className="hover:text-gray-300">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>+1(555) 123-4567</li>
              <li>support@bidhub.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Locations</h3>
            <ul className="space-y-2 text-sm">
              <li>123 Main Street, New York, NY 10001</li>
              <li>456 Market St, Los Angeles, CA 90012</li>
              <li>789 Lake Avenue, Chicago, IL 60601</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>© 2024 BidHub Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
