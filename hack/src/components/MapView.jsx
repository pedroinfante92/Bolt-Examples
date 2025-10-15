import { MapPin } from 'lucide-react';

export function MapView({ incidents }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'normal':
        return 'Normal';
      case 'warning':
        return 'Atenção';
      case 'critical':
        return 'Crítico';
    }
  };

  const positions = [
    { top: '20%', left: '30%' },
    { top: '35%', left: '50%' },
    { top: '50%', left: '25%' },
    { top: '60%', left: '60%' },
    { top: '25%', left: '70%' },
    { top: '70%', left: '40%' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Mapa de Cataluña</h2>

      <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg h-96 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path d="M20,30 L40,20 L60,25 L80,20 L85,40 L75,60 L60,75 L40,80 L25,70 L15,50 Z" fill="currentColor" className="text-blue-900"/>
          </svg>
        </div>

        {incidents.map((incident, idx) => {
          const position = positions[idx % positions.length];
          return (
            <div
              key={incident.neighborhood}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ top: position.top, left: position.left }}
            >
              <div className={`w-6 h-6 rounded-full ${getStatusColor(incident.status)} animate-pulse shadow-lg`}>
                <MapPin className="w-6 h-6 text-white" />
              </div>

              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                <p className="font-semibold">{incident.neighborhood}</p>
                <p>Estado: {getStatusLabel(incident.status)}</p>
                <p>Consumo: {incident.lastReading}L</p>
                {incident.deviation !== 0 && (
                  <p className="text-yellow-300">
                    Desvio: {incident.deviation > 0 ? '+' : ''}{incident.deviation}%
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-600">Atenção</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Crítico</span>
        </div>
      </div>
    </div>
  );
}
