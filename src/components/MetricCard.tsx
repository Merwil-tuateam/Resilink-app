import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';


// SRP: Separar tipos y lógica de presentación
export type MetricTrend = 'up' | 'down' | 'stable';
export type MetricColor = 'blue' | 'green' | 'emerald' | 'red' | 'yellow';

interface MetricCardProps {
  title: string;
  value: string;
  icon: typeof LucideIcon;
  trend: MetricTrend;
  color: MetricColor;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, trend, color }) => {

  // OCP: Utilidades para iconos y colores
  const trendIconMap = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  };
  const trendColorMap = {
    up: 'text-emerald-600',
    down: 'text-red-600',
    stable: 'text-slate-500',
  };
  const colorClassesMap = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    emerald: 'from-emerald-500 to-emerald-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
  };
  const TrendIcon = trendIconMap[trend];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
        <div className={`bg-gradient-to-r ${colorClassesMap[color]} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-center mt-4">
        <TrendIcon className={`w-4 h-4 ${trendColorMap[trend]}`} />
        <span className="text-xs text-slate-500 ml-1">vs. semana anterior</span>
      </div>
    </div>
  );
};

export default MetricCard;