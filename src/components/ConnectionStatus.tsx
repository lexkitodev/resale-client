import { useState, useEffect } from 'react';
import { HealthCheckResponse } from '../services/healthCheck';
import { socketService } from '../services/socket';

export const ConnectionStatus = () => {
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Connect to socket
    socketService.connect();

    // Listen for health updates
    socketService.onHealthUpdate((data) => {
      setHealth(data);
      setError(null);
    });

    // Check health immediately and every 30 seconds
    const checkHealth = () => socketService.checkHealth();
    checkHealth();
    const interval = setInterval(checkHealth, 30000);

    // Cleanup
    return () => {
      clearInterval(interval);
      socketService.disconnect();
    };
  }, []);

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
    );
  }

  if (!health) {
    return (
      <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded">
        Checking connection...
      </div>
    );
  }

  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      <p>API Status: {health.status}</p>
      <p>Database: {health.database}</p>
      <p className="text-sm">Last checked: {new Date(health.timestamp).toLocaleString()}</p>
    </div>
  );
};
