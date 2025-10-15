import { useEffect, useState } from 'react';
import { Droplets, RefreshCw, AlertCircle } from 'lucide-react';
import { WaterPulse } from './WaterPulse';
import { AlertsList } from './AlertsList';
import { MapView } from './MapView';
import { api } from '../services/api';

export function Dashboard() {
  const [consumption, setConsumption] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [consumptionData, anomaliesData, incidentsData] = await Promise.all([
        api.getConsumption(),
        api.getAnomalies(),
        api.getLatestIncidents()
      ]);

      setConsumption(consumptionData);
      setAnomalies(anomaliesData);
      setIncidents(incidentsData);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && consumption.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">A carregar dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Droplets className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AquaBeat</h1>
                <p className="text-sm text-gray-600">Monitorização Inteligente de Água</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <p className="text-gray-600">Última atualização</p>
                <p className="font-medium text-gray-900">
                  {lastUpdate.toLocaleTimeString('pt-PT')}
                </p>
              </div>
              <button
                onClick={fetchData}
                disabled={loading}
                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Atualizar dados"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Erro ao carregar dados</h3>
              <p className="text-sm text-red-700">{error}</p>
              <p className="text-xs text-red-600 mt-2">
                Certifique-se que o backend está a correr em {import.meta.env.VITE_API_URL || 'http://localhost:3000'}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Leituras Totais</h3>
            <p className="text-3xl font-bold text-blue-600">{consumption.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Anomalias Ativas</h3>
            <p className="text-3xl font-bold text-orange-600">{anomalies.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Zonas Críticas</h3>
            <p className="text-3xl font-bold text-red-600">
              {incidents.filter(i => i.status === 'critical').length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WaterPulse data={consumption} />
            <MapView incidents={incidents} />
          </div>

          <div>
            <AlertsList anomalies={anomalies} />
          </div>
        </div>
      </main>
    </div>
  );
}
