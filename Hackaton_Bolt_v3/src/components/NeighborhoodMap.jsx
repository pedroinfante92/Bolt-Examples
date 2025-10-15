import { MapPin } from 'lucide-react';
import { getStatusColor, getStatusLabel, formatLiters } from '../utils/helpers';

export default function NeighborhoodMap({ consumptionData, anomalies }) {
  const getAnomalyCount = (neighborhood) => {
    return anomalies.filter(a => a.neighborhood === neighborhood).length;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <MapPin className="text-blue-600" />
        Mapa de Consumo por Barrio
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {consumptionData.map((item) => {
          const statusColor = getStatusColor(item.percentageOfCity);
          const statusLabel = getStatusLabel(item.percentageOfCity);
          const anomalyCount = getAnomalyCount(item.neighborhood);

          const colorClasses = {
            green: 'bg-green-100 border-green-400 text-green-800',
            yellow: 'bg-yellow-100 border-yellow-400 text-yellow-800',
            red: 'bg-red-100 border-red-400 text-red-800'
          };

          const dotColors = {
            green: 'bg-green-500',
            yellow: 'bg-yellow-500',
            red: 'bg-red-500'
          };

          return (
            <div
              key={item.neighborhood}
              className={`border-2 rounded-lg p-4 transition-all hover:shadow-md ${colorClasses[statusColor]}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${dotColors[statusColor]} animate-pulse`}></div>
                  <h3 className="font-bold text-lg">{item.neighborhood}</h3>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white bg-opacity-50">
                  {statusLabel}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-80">Consumo Total:</span>
                  <span className="font-bold">{formatLiters(item.totalLiters)} L</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">% de la ciudad:</span>
                  <span className="font-bold">{item.percentageOfCity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Tipo de uso:</span>
                  <span className="font-bold capitalize">{item.mainUsageType}</span>
                </div>

                {anomalyCount > 0 && (
                  <div className="mt-3 pt-3 border-t border-current border-opacity-30">
                    <div className="flex items-center gap-2 text-red-700 font-semibold">
                      <div className="w-2 h-2 rounded-full bg-red-600 animate-ping"></div>
                      {anomalyCount} Alerta{anomalyCount > 1 ? 's' : ''}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
