import { AlertCircle } from 'lucide-react';

export default function AlertBanner({ anomalies }) {
  if (!anomalies || anomalies.length === 0) {
    return (
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-green-600" size={24} />
          <div>
            <p className="font-semibold text-green-800">Sistema Normal</p>
            <p className="text-sm text-green-700">No se detectaron anomalías en este momento</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <AlertCircle className="text-red-600 animate-pulse" size={24} />
        <div>
          <p className="font-semibold text-red-800">
            {anomalies.length} Anomalía{anomalies.length > 1 ? 's' : ''} Detectada{anomalies.length > 1 ? 's' : ''}
          </p>
          <p className="text-sm text-red-700">
            Revise las alertas en los barrios afectados
          </p>
        </div>
      </div>
    </div>
  );
}
