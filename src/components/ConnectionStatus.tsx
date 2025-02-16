import { useState, useEffect } from "react";
import { checkApiHealth, HealthCheckResponse } from "../services/healthCheck";

export const ConnectionStatus = () => {
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    try {
      const response = await checkApiHealth();
      setHealth(response);
      setError(null);
    } catch {
      setHealth(null);
      setError("Failed to connect to API");
    }
  };

  useEffect(() => {
    checkHealth();
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
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
      <p className="text-sm">
        Last checked: {new Date(health.timestamp).toLocaleString()}
      </p>
    </div>
  );
};
