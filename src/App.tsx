import './index.css';
import { Layout } from './components/layout/Layout';
import { ConnectionStatus } from './components/ConnectionStatus';

function App() {
  return (
    <Layout showSidebar={true}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Online Auction Platform</h1>
        <ConnectionStatus />
        {/* Add auction items grid here */}
      </div>
    </Layout>
  );
}

export default App;
