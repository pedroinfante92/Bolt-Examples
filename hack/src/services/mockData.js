const neighborhoods = ['Gràcia', 'Poblenou', 'Eixample', 'Sants', 'Sarrià', 'Horta'];

function generateConsumptionData() {
  const data = [];
  const now = new Date();

  for (let i = 0; i < 100; i++) {
    const timestamp = new Date(now.getTime() - (100 - i) * 3600000);

    neighborhoods.forEach(neighborhood => {
      let liters = 80 + Math.random() * 50;

      if (neighborhood === 'Gràcia' && i === 95) {
        liters = 500;
      }

      if (neighborhood === 'Poblenou' && i > 85 && i < 90) {
        liters = 20;
      }

      if (neighborhood === 'Eixample' && i > 70 && i < 75) {
        liters = 250;
      }

      data.push({
        id: `${neighborhood}-${i}`,
        neighborhood,
        timestamp: timestamp.toISOString(),
        liters: Math.round(liters),
        hour: timestamp.getHours()
      });
    });
  }

  return data;
}

function detectAnomalies(data) {
  const anomalies = [];
  const avgByNeighborhood = new Map();

  neighborhoods.forEach(n => {
    const values = data.filter(d => d.neighborhood === n).map(d => d.liters);
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    avgByNeighborhood.set(n, avg);
  });

  data.forEach(reading => {
    const avg = avgByNeighborhood.get(reading.neighborhood) || 100;
    const deviation = ((reading.liters - avg) / avg) * 100;

    if (Math.abs(deviation) > 30) {
      let type;
      let severity;

      if (reading.liters > avg * 2) {
        type = 'leak';
        severity = 'high';
      } else if (reading.liters > avg * 1.5) {
        type = 'spike';
        severity = 'medium';
      } else {
        type = 'drop';
        severity = reading.liters < avg * 0.3 ? 'high' : 'medium';
      }

      anomalies.push({
        id: `anomaly-${reading.id}`,
        neighborhood: reading.neighborhood,
        timestamp: reading.timestamp,
        liters: reading.liters,
        deviation: Math.round(deviation),
        type,
        severity
      });
    }
  });

  return anomalies.slice(-20);
}

function generateIncidents(anomalies) {
  const incidentMap = new Map();

  neighborhoods.forEach(n => {
    incidentMap.set(n, {
      neighborhood: n,
      status: 'normal',
      lastReading: 100,
      deviation: 0
    });
  });

  anomalies.forEach(anomaly => {
    const existing = incidentMap.get(anomaly.neighborhood);
    if (existing) {
      let status = 'normal';

      if (anomaly.severity === 'high') {
        status = 'critical';
      } else if (anomaly.severity === 'medium' && existing.status !== 'critical') {
        status = 'warning';
      }

      incidentMap.set(anomaly.neighborhood, {
        neighborhood: anomaly.neighborhood,
        status,
        lastReading: anomaly.liters,
        deviation: anomaly.deviation
      });
    }
  });

  return Array.from(incidentMap.values());
}

export const mockData = {
  consumption: generateConsumptionData(),
  get anomalies() {
    return detectAnomalies(this.consumption);
  },
  get incidents() {
    return generateIncidents(this.anomalies);
  }
};
