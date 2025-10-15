const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const fetchConsumption = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/consumption`);
    if (!response.ok) throw new Error('Failed to fetch consumption data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching consumption:', error);
    return getMockConsumption();
  }
};

export const fetchAnomalies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/anomalies`);
    if (!response.ok) throw new Error('Failed to fetch anomalies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching anomalies:', error);
    return getMockAnomalies();
  }
};

export const fetchSummary = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/summary`);
    if (!response.ok) throw new Error('Failed to fetch summary');
    return await response.json();
  } catch (error) {
    console.error('Error fetching summary:', error);
    return getMockSummary();
  }
};

const getMockConsumption = () => [
  {
    neighborhood: "Eixample",
    totalLiters: 2100.0,
    percentageOfCity: 18.5,
    mainUsageType: "industrial"
  },
  {
    neighborhood: "Gràcia",
    totalLiters: 1400.0,
    percentageOfCity: 12.3,
    mainUsageType: "domestic"
  },
  {
    neighborhood: "Poblenou",
    totalLiters: 1800.0,
    percentageOfCity: 15.8,
    mainUsageType: "domestic"
  },
  {
    neighborhood: "Sants",
    totalLiters: 1200.0,
    percentageOfCity: 10.5,
    mainUsageType: "domestic"
  },
  {
    neighborhood: "Sarrià",
    totalLiters: 950.0,
    percentageOfCity: 8.3,
    mainUsageType: "domestic"
  },
  {
    neighborhood: "Horta",
    totalLiters: 1100.0,
    percentageOfCity: 9.6,
    mainUsageType: "domestic"
  }
];

const getMockAnomalies = () => [
  {
    neighborhood: "Gràcia",
    date_time: "2025-10-15T03:00",
    type: "HIGH_CONSUMPTION",
    message: "Posible fuga nocturna",
    consumption_liters: 510.2
  },
  {
    neighborhood: "Eixample",
    date_time: "2025-10-15T02:30",
    type: "HIGH_CONSUMPTION",
    message: "Consumo industrial elevado",
    consumption_liters: 780.5
  }
];

const getMockSummary = () => [
  {
    neighborhood: "Eixample",
    totalLiters: 2100.0,
    percentageOfCity: 18.5,
    mainUsageType: "industrial"
  }
];
