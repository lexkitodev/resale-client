import './index.css';
import { Layout } from './components/layout/Layout';
import { ConnectionStatus } from './components/ConnectionStatus';
import { AuctionGrid } from './components/AuctionGrid';

function App() {
  return (
    <Layout showSidebar={true}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Online Auction Platform</h1>
        <ConnectionStatus />
        <div className="mt-8">
          <AuctionGrid />
        </div>
      </div>
    </Layout>
  );
}

export default App;
