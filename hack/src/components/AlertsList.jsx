import { AlertTriangle, Droplets, TrendingDown } from 'lucide-react';

export function AlertsList({ anomalies }) {
  const getIcon = (type) => {
    switch (type) {
      case 'spike':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'leak':
        return <Droplets className="w-5 h-5 text-red-500" />;
      case 'drop':
        return <TrendingDown className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'medium':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'low':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'spike':
        return 'Pico de Consumo';
      case 'leak':
        return 'Possível Fuga';
      case 'drop':
        return 'Queda Abrupta';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Alertas Recentes</h2>

      {anomalies.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Droplets className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p>Nenhuma anomalia detectada</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className={`border-2 rounded-lg p-4 ${getSeverityColor(anomaly.severity)}`}
            >
              <div className="flex items-start gap-3">
                {getIcon(anomaly.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{anomaly.neighborhood}</h3>
                    <span className="text-xs font-medium uppercase">
                      {anomaly.severity}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{getTypeLabel(anomaly.type)}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span>Consumo: {anomaly.liters}L</span>
                    <span>Desvio: {anomaly.deviation > 0 ? '+' : ''}{anomaly.deviation}%</span>
                  </div>
                  <p className="text-xs mt-2 opacity-75">
                    {new Date(anomaly.timestamp).toLocaleString('pt-PT')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
