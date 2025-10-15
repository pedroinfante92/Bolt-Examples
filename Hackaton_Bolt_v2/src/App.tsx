import { useState, useEffect } from 'react';
import { Droplet, TrendingUp, AlertCircle } from 'lucide-react';
import Header from './components/Header';
import StatCard from './components/StatCard';
import AlertBanner from './components/AlertBanner';
import NeighborhoodMap from './components/NeighborhoodMap';
import ConsumptionChart from './components/ConsumptionChart';
import AnomalyList from './components/AnomalyList';
import { fetchConsumption, fetchAnomalies, fetchSummary } from './services/api';
import { formatLiters } from './utils/helpers';

function App() {
  const [consumptionData, setConsumptionData] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [consumption, anomaliesData, summaryData] = await Promise.all([
          fetchConsumption(),
          fetchAnomalies(),
          fetchSummary()
        ]);

        setConsumptionData(consumption);
        setAnomalies(anomaliesData);
        setSummary(summaryData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const totalConsumption = consumptionData.reduce((sum, item) => sum + item.totalLiters, 0);
  const avgPercentage = consumptionData.length > 0
    ? (consumptionData.reduce((sum, item) => sum + item.percentageOfCity, 0) / consumptionData.length).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Droplet className="w-16 h-16 text-blue-600 animate-bounce mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">Cargando datos de AquaBeat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <AlertBanner anomalies={anomalies} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Droplet}
            label="Consumo Total"
            value={`${formatLiters(totalConsumption)} L`}
            subValue={`${consumptionData.length} barrios monitoreados`}
            color="blue"
          />
          <StatCard
            icon={TrendingUp}
            label="Promedio por Barrio"
            value={`${avgPercentage}%`}
            subValue="Del total de la ciudad"
            color="green"
          />
          <StatCard
            icon={AlertCircle}
            label="Alertas Activas"
            value={anomalies.length}
            subValue={anomalies.length > 0 ? 'Requieren atención' : 'Sistema normal'}
            color={anomalies.length > 0 ? 'red' : 'green'}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ConsumptionChart consumptionData={consumptionData} />
          <AnomalyList anomalies={anomalies} />
        </div>

        <NeighborhoodMap consumptionData={consumptionData} anomalies={anomalies} />
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-6 text-center text-gray-600 text-sm">
          <p>AquaBeat - Sistema de Monitoreo Inteligente de Agua</p>
          <p className="mt-1">Barcelona, Catalunya</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
