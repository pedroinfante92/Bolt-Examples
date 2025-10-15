import { MapPin } from 'lucide-react';
import { getStatusColor } from '../utils/helpers';

export default function CatalunyaMap({ consumptionData, anomalies }) {
  const neighborhoods = [
    { name: 'Eixample', x: 45, y: 22 },
    { name: 'Gràcia', x: 73, y: 33 },
    { name: 'Poblenou', x: 87, y: 25 },
    { name: 'Sants', x: 35, y: 42 },
    { name: 'Sarrià', x: 60, y: 55 },
    { name: 'Horta', x: 78, y: 48 }
  ];

  const getNeighborhoodStatus = (name) => {
    const data = consumptionData.find(d => d.neighborhood === name);
    if (!data) return 'green';
    return getStatusColor(data.percentageOfCity);
  };

  const getNeighborhoodData = (name) => {
    return consumptionData.find(d => d.neighborhood === name);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Mapa de Cataluña
      </h2>

      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8" style={{ minHeight: '500px' }}>
        <svg
          viewBox="0 0 100 70"
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        >
          <path
            d="M 55 23 Q 65 20, 75 25 Q 85 30, 90 40 Q 92 50, 85 58 Q 75 65, 65 63 Q 55 60, 50 55 Q 40 50, 35 45 Q 30 35, 38 28 Q 45 22, 55 23 Z"
            fill="#CBD5E1"
            opacity="0.5"
            className="drop-shadow-lg"
          />

          {neighborhoods.map((neighborhood) => {
            const status = getNeighborhoodStatus(neighborhood.name);
            const data = getNeighborhoodData(neighborhood.name);
            const hasAnomaly = anomalies.some(a => a.neighborhood === neighborhood.name);

            const pinColors = {
              green: '#10B981',
              yellow: '#F59E0B',
              red: '#EF4444'
            };

            const strokeColors = {
              green: '#059669',
              yellow: '#D97706',
              red: '#DC2626'
            };

            return (
              <g key={neighborhood.name}>
                <circle
                  cx={neighborhood.x}
                  cy={neighborhood.y}
                  r={hasAnomaly ? "2.5" : "0"}
                  fill={pinColors[status]}
                  opacity="0.3"
                  className={hasAnomaly ? "animate-ping" : ""}
                />

                <g className="cursor-pointer hover:scale-110 transition-transform origin-center group">
                  <circle
                    cx={neighborhood.x}
                    cy={neighborhood.y}
                    r="3"
                    fill="white"
                    stroke={strokeColors[status]}
                    strokeWidth="0.3"
                  />

                  <path
                    d={`M ${neighborhood.x} ${neighborhood.y - 3}
                        Q ${neighborhood.x} ${neighborhood.y - 4.5}, ${neighborhood.x - 1.2} ${neighborhood.y - 4.5}
                        Q ${neighborhood.x - 2.2} ${neighborhood.y - 4.5}, ${neighborhood.x - 2.2} ${neighborhood.y - 3.5}
                        Q ${neighborhood.x - 2.2} ${neighborhood.y - 2.5}, ${neighborhood.x} ${neighborhood.y}
                        Q ${neighborhood.x + 2.2} ${neighborhood.y - 2.5}, ${neighborhood.x + 2.2} ${neighborhood.y - 3.5}
                        Q ${neighborhood.x + 2.2} ${neighborhood.y - 4.5}, ${neighborhood.x + 1.2} ${neighborhood.y - 4.5}
                        Q ${neighborhood.x} ${neighborhood.y - 4.5}, ${neighborhood.x} ${neighborhood.y - 3} Z`}
                    fill={pinColors[status]}
                    stroke="white"
                    strokeWidth="0.2"
                  />

                  <circle
                    cx={neighborhood.x}
                    cy={neighborhood.y - 3}
                    r="0.8"
                    fill="white"
                  />

                  <foreignObject
                    x={neighborhood.x - 15}
                    y={neighborhood.y + 2}
                    width="30"
                    height="20"
                    className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  >
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg text-center">
                      <div className="font-bold">{neighborhood.name}</div>
                      {data && (
                        <div className="text-[0.65rem] mt-0.5">
                          {data.totalLiters.toFixed(0)}L
                        </div>
                      )}
                    </div>
                  </foreignObject>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-center gap-8 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="text-green-500" size={20} fill="#10B981" />
          <span className="text-gray-700 font-medium">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-yellow-500" size={20} fill="#F59E0B" />
          <span className="text-gray-700 font-medium">Atenção</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-red-500" size={20} fill="#EF4444" />
          <span className="text-gray-700 font-medium">Crítico</span>
        </div>
      </div>
    </div>
  );
}
