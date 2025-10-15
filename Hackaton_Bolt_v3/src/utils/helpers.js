export const getStatusColor = (percentageOfCity) => {
  if (percentageOfCity > 15) return 'red';
  if (percentageOfCity > 10) return 'yellow';
  return 'green';
};

export const getStatusLabel = (percentageOfCity) => {
  if (percentageOfCity > 15) return 'Crítico';
  if (percentageOfCity > 10) return 'Alerta';
  return 'Normal';
};

export const formatLiters = (liters) => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(liters);
};

export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getAnomalyTypeLabel = (type) => {
  const labels = {
    'HIGH_CONSUMPTION': 'Alto Consumo',
    'LOW_CONSUMPTION': 'Bajo Consumo',
    'LEAK': 'Fuga Detectada'
  };
  return labels[type] || type;
};

export const getUsageTypeLabel = (type) => {
  const labels = {
    'domestic': 'Doméstico',
    'industrial': 'Industrial',
    'commercial': 'Comercial'
  };
  return labels[type] || type;
};
