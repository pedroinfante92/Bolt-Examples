import { AlertTriangle, Clock } from 'lucide-react';
import { formatDateTime, getAnomalyTypeLabel, formatLiters } from '../utils/helpers';

export default function AnomalyList({ anomalies }) {
  if (!anomalies || anomalies.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <AlertTriangle className="text-yellow-600" />
          Alertas Detectadas
        </h2>
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No hay alertas en este momento</p>
          <p className="text-sm mt-2">El sistema está monitoreando continuamente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <AlertTriangle className="text-yellow-600" />
        Alertas Detectadas
        <span className="ml-auto text-sm font-normal bg-red-100 text-red-700 px-3 py-1 rounded-full">
          {anomalies.length} {anomalies.length === 1 ? 'Activa' : 'Activas'}
        </span>
      </h2>

      <div className="space-y-3">
        {anomalies.map((anomaly, index) => {
          const typeColorClasses = {
            'HIGH_CONSUMPTION': 'border-l-red-500 bg-red-50',
            'LOW_CONSUMPTION': 'border-l-yellow-500 bg-yellow-50',
            'LEAK': 'border-l-orange-500 bg-orange-50'
          };

          const iconColorClasses = {
            'HIGH_CONSUMPTION': 'text-red-600',
            'LOW_CONSUMPTION': 'text-yellow-600',
            'LEAK': 'text-orange-600'
          };

          return (
            <div
              key={`${anomaly.neighborhood}-${index}`}
              className={`border-l-4 rounded-lg p-4 transition-all hover:shadow-md ${typeColorClasses[anomaly.type] || 'border-l-gray-500 bg-gray-50'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle
                      className={`${iconColorClasses[anomaly.type] || 'text-gray-600'} animate-pulse`}
                      size={20}
                    />
                    <h3 className="font-bold text-gray-800">{anomaly.neighborhood}</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white">
                      {getAnomalyTypeLabel(anomaly.type)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-2">{anomaly.message}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{formatDateTime(anomaly.date_time)}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Consumo: </span>
                      <span>{formatLiters(anomaly.consumption_liters)} L</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
