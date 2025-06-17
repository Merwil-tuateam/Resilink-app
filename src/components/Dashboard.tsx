import React from 'react';
import { TrendingUp, TrendingDown, Truck, Leaf, Euro, Weight } from 'lucide-react';
import MetricCard from './MetricCard';
import EfficiencyChart from './EfficiencyChart';
import EnvironmentalImpact from './EnvironmentalImpact';

interface DashboardProps {
  realTimeData: {
    activeVehicles: number;
    routesOptimized: number;
    co2Saved: number;
    costReduction: number;
    wasteCollected: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ realTimeData }) => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <MetricCard
          title="Vehículos Activos"
          value={realTimeData.activeVehicles.toString()}
          icon={Truck}
          trend="stable"
          color="blue"
        />
        <MetricCard
          title="Rutas Optimizadas"
          value={realTimeData.routesOptimized.toString()}
          icon={TrendingUp}
          trend="up"
          color="green"
        />
        <MetricCard
          title="CO₂ Ahorrado (kg)"
          value={realTimeData.co2Saved.toLocaleString()}
          icon={Leaf}
          trend="up"
          color="emerald"
        />
        <MetricCard
          title="Reducción de Costes"
          value={`${realTimeData.costReduction.toFixed(1)}%`}
          icon={Euro}
          trend="up"
          color="green"
        />
        <MetricCard
          title="Residuos (Tn)"
          value={realTimeData.wasteCollected.toFixed(1)}
          icon={Weight}
          trend="up"
          color="blue"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Eficiencia de Rutas Semanal</h3>
          <EfficiencyChart />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Impacto Ambiental</h3>
          <EnvironmentalImpact co2Saved={realTimeData.co2Saved} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Actividad Reciente</h3>
        <div className="space-y-3">
          {[
            { time: '09:15', action: 'Ruta Valencia Centro optimizada', efficiency: '+12% eficiencia' },
            { time: '09:08', action: 'Sensor ambiental Xàtiva activado', status: 'Calidad del aire: Buena' },
            { time: '08:45', action: 'Vehículo V-024 completó ruta', waste: '2.3 Tn recogidas' },
            { time: '08:30', action: 'Predicción de demanda actualizada', prediction: 'Aumento del 8% esperado' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-600">
                  {activity.efficiency || activity.status || activity.waste || activity.prediction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;