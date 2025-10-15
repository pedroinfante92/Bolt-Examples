import { useState, useMemo } from 'react';
import { Activity, ChevronDown } from 'lucide-react';
import { generateTimeSeriesData, calculateStats } from '../utils/mockTimeSeriesData';

export default function WaterPulseChart({ consumptionData, anomalies }) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Gràcia');
  const [isOpen, setIsOpen] = useState(false);

  const timeSeriesData = useMemo(() => {
    return generateTimeSeriesData(selectedNeighborhood, anomalies);
  }, [selectedNeighborhood, anomalies]);

  const stats = useMemo(() => {
    return calculateStats(timeSeriesData);
  }, [timeSeriesData]);

  const maxValue = Math.max(...timeSeriesData.map(d => d.value));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Activity className="text-blue-600" />
          Pulso de Água
        </h2>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-white border-2 border-blue-500 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors min-w-[180px] justify-between"
          >
            <span>{selectedNeighborhood}</span>
            <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-full bg-white border-2 border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden">
              {consumptionData.map((item) => (
                <button
                  key={item.neighborhood}
                  onClick={() => {
                    setSelectedNeighborhood(item.neighborhood);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors ${
                    selectedNeighborhood === item.neighborhood ? 'bg-blue-100 font-semibold text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {item.neighborhood}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium mb-1">Média de Consumo</p>
          <p className="text-3xl font-bold text-blue-700">{stats.average}L</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-sm text-red-600 font-medium mb-1">Pico Máximo</p>
          <p className="text-3xl font-bold text-red-700">{stats.peak}L</p>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-blue-50 to-white rounded-lg p-6" style={{ height: '300px' }}>
        <div className="flex items-end justify-between h-full gap-0.5">
          {timeSeriesData.map((point, index) => {
            const height = (point.value / maxValue) * 100;

            return (
              <div
                key={index}
                className="flex-1 relative group"
              >
                <div
                  className={`w-full rounded-t transition-all duration-300 ${
                    point.isAnomaly
                      ? 'bg-gradient-to-t from-red-500 to-red-400'
                      : 'bg-gradient-to-t from-blue-500 to-blue-400'
                  } hover:opacity-80 cursor-pointer`}
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    <div className="font-bold">{Math.round(point.value)}L</div>
                    <div className="text-[0.65rem]">{`${Math.floor(point.hour / 2)}:${point.hour % 2 === 0 ? '00' : '30'}`}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 rounded bg-gradient-to-t from-blue-500 to-blue-400"></div>
          <span className="text-gray-700 font-medium">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 rounded bg-gradient-to-t from-red-500 to-red-400"></div>
          <span className="text-gray-700 font-medium">Anomalia</span>
        </div>
      </div>
    </div>
  );
}
