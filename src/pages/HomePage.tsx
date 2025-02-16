import { Layout } from '../components/layout/Layout';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { AuctionGrid } from '../components/AuctionGrid';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const HomePage = () => {
  useDocumentTitle('Home');

  return (
    <Layout showSidebar>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Online Auction Platform</h1>
        <ConnectionStatus />
        <AuctionGrid />
      </div>
    </Layout>
  );
};
