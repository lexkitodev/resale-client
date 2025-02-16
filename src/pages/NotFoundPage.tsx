import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { FaHome } from 'react-icons/fa';

export const NotFoundPage = () => {
  return (
    <Layout showSidebar={false}>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-[#4169e1]">404</h1>
          <h2 className="text-2xl font-medium text-gray-700 mt-4 mb-6">Page Not Found</h2>
          <p className="text-gray-500 mb-8">
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#4169e1] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <FaHome className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};
