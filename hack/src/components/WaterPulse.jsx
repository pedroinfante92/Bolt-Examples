import { useState } from 'react';
import { Activity } from 'lucide-react';

export function WaterPulse({ data }) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');

  const neighborhoods = ['all', ...new Set(data.map(d => d.neighborhood))];

  const filteredData = selectedNeighborhood === 'all'
    ? data
    : data.filter(d => d.neighborhood === selectedNeighborhood);

  const maxLiters = Math.max(...filteredData.map(d => d.liters), 1);
  const avgLiters = filteredData.reduce((sum, d) => sum + d.liters, 0) / filteredData.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Pulso de Água</h2>
        </div>

        <select
          value={selectedNeighborhood}
          onChange={(e) => setSelectedNeighborhood(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {neighborhoods.map(n => (
            <option key={n} value={n}>
              {n === 'all' ? 'Todos os Bairros' : n}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Média de Consumo</p>
          <p className="text-2xl font-bold text-blue-600">{avgLiters.toFixed(0)}L</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Pico Máximo</p>
          <p className="text-2xl font-bold text-blue-600">{maxLiters}L</p>
        </div>
      </div>

      <div className="h-64 flex items-end gap-1 overflow-x-auto">
        {filteredData.slice(-50).map((point, idx) => {
          const height = (point.liters / maxLiters) * 100;
          const isAnomaly = point.liters > avgLiters * 1.3 || point.liters < avgLiters * 0.5;

          return (
            <div
              key={idx}
              className="flex-1 min-w-[8px] relative group cursor-pointer"
              style={{ height: '100%' }}
            >
              <div
                className={`absolute bottom-0 w-full rounded-t transition-all ${
                  isAnomaly ? 'bg-red-500' : 'bg-blue-500'
                } hover:opacity-80`}
                style={{ height: `${height}%` }}
              />

              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                <p className="font-semibold">{point.neighborhood}</p>
                <p>{point.liters}L</p>
                <p className="text-gray-300">{new Date(point.timestamp).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-600">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-600">Anomalia</span>
        </div>
      </div>
    </div>
  );
}
