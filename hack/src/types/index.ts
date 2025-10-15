export interface ConsumptionData {
  id: string;
  neighborhood: string;
  timestamp: string;
  liters: number;
  hour: number;
}

export interface Anomaly {
  id: string;
  neighborhood: string;
  timestamp: string;
  liters: number;
  deviation: number;
  type: 'spike' | 'leak' | 'drop';
  severity: 'low' | 'medium' | 'high';
}

export interface Incident {
  neighborhood: string;
  status: 'normal' | 'warning' | 'critical';
  lastReading: number;
  deviation: number;
}

export interface NeighborhoodStatus {
  name: string;
  status: 'normal' | 'warning' | 'critical';
  color: string;
}
