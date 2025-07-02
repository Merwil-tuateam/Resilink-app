

import React, { useState, useCallback, useMemo, Suspense, lazy } from 'react';
import Header from './components/Header';

const Dashboard = lazy(() => import('./components/Dashboard'));
const MapView = lazy(() => import('./components/MapView'));
const FleetMonitoring = lazy(() => import('./components/FleetMonitoring'));
const Analytics = lazy(() => import('./components/Analytics'));
const RouteOptimizer = lazy(() => import('./components/RouteOptimizer'));
const RouteEditor = lazy(() => import('./components/RouteEditor'));

// Types for real-time data
interface RealTimeData {
  activeVehicles: number;
  routesOptimized: number;
  co2Saved: number;
  costReduction: number;
  wasteCollected: number;
}


const INITIAL_REALTIME_DATA: RealTimeData = {
  activeVehicles: 24,
  routesOptimized: 8,
  co2Saved: 1247,
  costReduction: 18.5,
  wasteCollected: 156.7,
};

const TABS = [
  'dashboard',
  'map',
  'fleet',
  'analytics',
  'optimizer',
  'editor',
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [realTimeData, setRealTimeData] = useState<RealTimeData>(INITIAL_REALTIME_DATA);

  // Simulate real-time data updates (SRP: only updates data)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        co2Saved: prev.co2Saved + Math.floor(Math.random() * 5),
        wasteCollected: parseFloat((prev.wasteCollected + Math.random() * 0.5).toFixed(1)),
        costReduction: Math.min(25, parseFloat((prev.costReduction + Math.random() * 0.1).toFixed(1))),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Memoize tab content for performance (OCP: easy to extend)
  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard realTimeData={realTimeData} />;
      case 'map':
        return <MapView />;
      case 'fleet':
        return <FleetMonitoring />;
      case 'analytics':
        return <Analytics />;
      case 'optimizer':
        return <RouteOptimizer />;
      case 'editor':
        return <RouteEditor />;
      default:
        return null;
    }
  }, [activeTab, realTimeData]);

  // LSP: setActiveTab is always called with a valid tab
  const handleTabChange = useCallback((tab: string) => {
    if (TABS.includes(tab)) setActiveTab(tab);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header activeTab={activeTab} setActiveTab={handleTabChange} />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Suspense fallback={<div className="text-center py-12 text-slate-400">Cargando...</div>}>
          {renderTabContent}
        </Suspense>
      </main>
    </div>
  );
};

export default App;