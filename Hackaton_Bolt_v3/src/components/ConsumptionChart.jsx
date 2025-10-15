import { Activity } from 'lucide-react';
import { formatLiters } from '../utils/helpers';

export default function ConsumptionChart({ consumptionData }) {
  const maxLiters = Math.max(...consumptionData.map(d => d.totalLiters));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Activity className="text-cyan-600" />
        Ritmo del Agua - Consumo por Barrio
      </h2>

      <div className="space-y-4">
        {consumptionData.map((item) => {
          const percentage = (item.totalLiters / maxLiters) * 100;

          const getBarColor = (pct) => {
            if (pct > 90) return 'bg-gradient-to-r from-red-500 to-red-600';
            if (pct > 70) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
            return 'bg-gradient-to-r from-green-500 to-green-600';
          };

          return (
            <div key={item.neighborhood} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {item.neighborhood}
                </span>
                <span className="text-sm text-gray-600 font-medium">
                  {formatLiters(item.totalLiters)} L
                </span>
              </div>

              <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getBarColor(percentage)} transition-all duration-1000 ease-out flex items-center justify-end pr-3`}
                  style={{ width: `${percentage}%` }}
                >
                  <span className="text-white text-xs font-bold drop-shadow">
                    {item.percentageOfCity}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Tipo: <span className="capitalize font-medium">{item.mainUsageType}</span></span>
                <span>Del total de la ciudad</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-gray-600">Alerta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Crítico</span>
          </div>
        </div>
      </div>
    </div>
  );
}
