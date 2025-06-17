import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import FleetMonitoring from './components/FleetMonitoring';
import Analytics from './components/Analytics';
import RouteOptimizer from './components/RouteOptimizer';
import RouteEditor from './components/RouteEditor';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [realTimeData, setRealTimeData] = useState({
    activeVehicles: 24,
    routesOptimized: 8,
    co2Saved: 1247,
    costReduction: 18.5,
    wasteCollected: 156.7
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        co2Saved: prev.co2Saved + Math.floor(Math.random() * 5),
        wasteCollected: prev.wasteCollected + (Math.random() * 0.5),
        costReduction: Math.min(25, prev.costReduction + (Math.random() * 0.1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {activeTab === 'dashboard' && <Dashboard realTimeData={realTimeData} />}
        {activeTab === 'map' && <MapView />}
        {activeTab === 'fleet' && <FleetMonitoring />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'optimizer' && <RouteOptimizer />}
        {activeTab === 'editor' && <RouteEditor />}
      </main>
    </div>
  );
}

export default App;