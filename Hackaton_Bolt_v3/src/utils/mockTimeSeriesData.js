export const generateTimeSeriesData = (neighborhood, anomalies) => {
  const baseConsumption = {
    'Eixample': 150,
    'Gràcia': 110,
    'Poblenou': 130,
    'Sants': 100,
    'Sarrià': 80,
    'Horta': 95
  };

  const base = baseConsumption[neighborhood] || 100;
  const data = [];

  for (let i = 0; i < 48; i++) {
    const variance = Math.random() * 20 - 10;
    const value = base + variance;

    const hasAnomaly = anomalies.some(a => {
      if (a.neighborhood !== neighborhood) return false;
      const anomalyHour = new Date(a.date_time).getHours();
      return i === anomalyHour * 2;
    });

    data.push({
      hour: i,
      value: hasAnomaly ? value * 3.5 : Math.max(value, 20),
      isAnomaly: hasAnomaly
    });
  }

  return data;
};

export const calculateStats = (data) => {
  const normalData = data.filter(d => !d.isAnomaly);
  const avg = normalData.reduce((sum, d) => sum + d.value, 0) / normalData.length;
  const max = Math.max(...data.map(d => d.value));

  return {
    average: Math.round(avg),
    peak: Math.round(max)
  };
};
