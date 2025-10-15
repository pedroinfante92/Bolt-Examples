import { mockData } from './mockData';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function simulateDelay(data, ms = 300) {
  await new Promise(resolve => setTimeout(resolve, ms));
  return data;
}

export const api = {
  async getConsumption() {
    if (USE_MOCK_DATA) {
      return simulateDelay(mockData.consumption);
    }

    const response = await fetch(`${API_BASE_URL}/consumption`);
    if (!response.ok) throw new Error('Failed to fetch consumption data');
    return response.json();
  },

  async getAnomalies() {
    if (USE_MOCK_DATA) {
      return simulateDelay(mockData.anomalies);
    }

    const response = await fetch(`${API_BASE_URL}/anomalies`);
    if (!response.ok) throw new Error('Failed to fetch anomalies');
    return response.json();
  },

  async getLatestIncidents() {
    if (USE_MOCK_DATA) {
      return simulateDelay(mockData.incidents);
    }

    const response = await fetch(`${API_BASE_URL}/incidents/latest`);
    if (!response.ok) throw new Error('Failed to fetch incidents');
    return response.json();
  }
};
