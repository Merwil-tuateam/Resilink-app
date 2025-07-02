import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Brain, Target, Zap } from 'lucide-react';


// SRP: Separar datos y lógica de presentación
const WASTE_GENERATION_DATA = [
  { month: 'Ene', residential: 2400, commercial: 1200, industrial: 800 },
  { month: 'Feb', residential: 2200, commercial: 1100, industrial: 750 },
  { month: 'Mar', residential: 2600, commercial: 1400, industrial: 900 },
  { month: 'Abr', residential: 2800, commercial: 1500, industrial: 950 },
  { month: 'May', residential: 3000, commercial: 1600, industrial: 1000 },
  { month: 'Jun', residential: 3200, commercial: 1700, industrial: 1100 },
];
const ROUTE_EFFICIENCY_DATA = [
  { name: 'Valencia Centro', efficiency: 95 },
  { name: 'Xàtiva', efficiency: 88 },
  { name: 'Gandia', efficiency: 92 },
  { name: 'Alzira', efficiency: 85 },
  { name: 'Sueca', efficiency: 90 },
];
const PREDICTIVE_DATA = [
  { week: 'S1', actual: 850, predicted: 820 },
  { week: 'S2', actual: 920, predicted: 900 },
  { week: 'S3', actual: 780, predicted: 790 },
  { week: 'S4', actual: 1100, predicted: 1080 },
  { week: 'S5', actual: null, predicted: 950 },
  { week: 'S6', actual: null, predicted: 1020 },
];
const ML_INSIGHTS = [
  {
    title: 'Patrón Identificado',
    description: 'Los miércoles presentan un 15% más de residuos comerciales',
    bg: 'from-purple-50 to-blue-50',
  },
  {
    title: 'Optimización Sugerida',
    description: 'Redistribuir 2 vehículos para rutas de alta demanda',
    bg: 'from-green-50 to-emerald-50',
  },
  {
    title: 'Alerta Predictiva',
    description: 'Mantenimiento preventivo recomendado para V-018',
    bg: 'from-orange-50 to-yellow-50',
  },
];

const Analytics: React.FC = () => (
  <div className="space-y-6">
    {/* Analytics Overview */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Precisión Predictiva</p>
            <p className="text-2xl font-bold text-slate-800">94.2%</p>
          </div>
          <Brain className="w-8 h-8 text-purple-600" />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Optimización IA</p>
            <p className="text-2xl font-bold text-slate-800">+23%</p>
          </div>
          <Zap className="w-8 h-8 text-yellow-600" />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Rutas Mejoradas</p>
            <p className="text-2xl font-bold text-slate-800">127</p>
          </div>
          <Target className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Tendencia Mensual</p>
            <p className="text-2xl font-bold text-slate-800">+8.5%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-600" />
        </div>
      </div>
    </div>
    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Waste Generation Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Generación de Residuos por Sector</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WASTE_GENERATION_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="residential" stackId="a" fill="#10b981" name="Residencial" />
              <Bar dataKey="commercial" stackId="a" fill="#3b82f6" name="Comercial" />
              <Bar dataKey="industrial" stackId="a" fill="#f59e0b" name="Industrial" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Route Efficiency */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Eficiencia por Ruta</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ROUTE_EFFICIENCY_DATA} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" stroke="#64748b" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value) => [`${value}%`, 'Eficiencia']}
              />
              <Bar dataKey="efficiency" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    {/* Predictive Analytics */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Análisis Predictivo - Demanda de Servicios</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={PREDICTIVE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#10b981"
              strokeWidth={3}
              name="Real"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicción"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800 font-medium">Predicción para las próximas 2 semanas:</p>
        <p className="text-xs text-blue-600">Incremento esperado del 8% en la demanda debido a festividades locales</p>
      </div>
    </div>
    {/* ML Insights */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Insights de Machine Learning</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ML_INSIGHTS.map((insight, idx) => (
          <div key={idx} className={`p-4 bg-gradient-to-r ${insight.bg} rounded-lg`}>
            <h4 className="font-medium text-slate-800 mb-2">{insight.title}</h4>
            <p className="text-sm text-slate-600">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Analytics;