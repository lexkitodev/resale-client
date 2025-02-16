import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  database: "connected" | "disconnected";
}

export const checkApiHealth = async (): Promise<HealthCheckResponse> => {
  try {
    const response = await axios.get<HealthCheckResponse>(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    console.error("API Health check failed:", error);
    throw error;
  }
};
