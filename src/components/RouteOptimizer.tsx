import React, { useState } from 'react';
import { Route, MapPin, Clock, Fuel, Play, Settings, ChevronRight } from 'lucide-react';

const RouteOptimizer: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState('valencia-centro');
  const [optimizing, setOptimizing] = useState(false);
  
  const routes = [
    {
      id: 'valencia-centro',
      name: 'Valencia Centro',
      stops: 24,
      distance: '45.2 km',
      estimatedTime: '4h 30m',
      efficiency: 92,
      vehicles: 2
    },
    {
      id: 'xativa-sueca',
      name: 'Xàtiva - Sueca',
      stops: 18,
      distance: '38.7 km',
      estimatedTime: '3h 45m',
      efficiency: 88,
      vehicles: 1
    },
    {
      id: 'gandia-costa',
      name: 'Gandia Costa',
      stops: 31,
      distance: '52.1 km',
      estimatedTime: '5h 15m',
      efficiency: 85,
      vehicles: 2
    }
  ];

  const optimizationSteps = [
    {
      step: 1,
      title: 'Análisis de Datos',
      description: 'Procesando datos de tráfico, meteorología y sensores',
      completed: true
    },
    {
      step: 2,
      title: 'Algoritmo de Optimización',
      description: 'Calculando rutas óptimas con IA',
      completed: optimizing,
      current: optimizing
    },
    {
      step: 3,
      title: 'Validación',
      description: 'Verificando restricciones y capacidades',
      completed: false
    },
    {
      step: 4,
      title: 'Implementación',
      description: 'Enviando rutas optimizadas a la flota',
      completed: false
    }
  ];

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
    }, 3000);
  };

  const selectedRouteData = routes.find(r => r.id === selectedRoute);

  return (
    <div className="space-y-6">
      {/* Route Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Seleccionar Ruta para Optimizar</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routes.map((route) => (
            <div 
              key={route.id}
              onClick={() => setSelectedRoute(route.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedRoute === route.id 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-800">{route.name}</h4>
                <div className={`w-4 h-4 rounded-full ${
                  selectedRoute === route.id ? 'bg-emerald-500' : 'bg-slate-300'
                }`}></div>
              </div>
              
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Paradas:</span>
                  <span className="font-medium">{route.stops}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Distancia:</span>
                  <span className="font-medium">{route.distance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tiempo est.:</span>
                  <span className="font-medium">{route.estimatedTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Eficiencia:</span>
                  <span className="font-medium">{route.efficiency}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Optimización de Ruta: {selectedRouteData?.name}</h3>
          <button
            onClick={handleOptimize}
            disabled={optimizing}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              optimizing
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-200'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>{optimizing ? 'Optimizando...' : 'Iniciar Optimización'}</span>
          </button>
        </div>

        {/* Optimization Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="font-medium text-slate-800">Parámetros de Optimización</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Prioridad</label>
                <select className="w-full p-2 border border-slate-300 rounded-lg text-sm">
                  <option>Minimizar tiempo</option>
                  <option>Minimizar combustible</option>
                  <option>Maximizar eficiencia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Restricciones de tráfico</label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-slate-600">Considerar tráfico en tiempo real</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-slate-800">Condiciones Ambientales</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Temperatura:</span>
                <span className="font-medium">22°C</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Viento:</span>
                <span className="font-medium">8 km/h NE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Lluvia:</span>
                <span className="font-medium">0% prob.</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Calidad aire:</span>
                <span className="font-medium text-green-600">Buena</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-slate-800">Estado de la Flota</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Vehículos disponibles:</span>
                <span className="font-medium">{selectedRouteData?.vehicles}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Combustible promedio:</span>
                <span className="font-medium">74%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Capacidad promedio:</span>
                <span className="font-medium">85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Process */}
        <div className="border-t border-slate-200 pt-6">
          <h4 className="font-medium text-slate-800 mb-4">Proceso de Optimización</h4>
          <div className="space-y-4">
            {optimizationSteps.map((step) => (
              <div key={step.step} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed 
                    ? 'bg-emerald-500 text-white' 
                    : step.current 
                    ? 'bg-blue-500 text-white animate-pulse'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {step.step}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{step.title}</p>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
                {step.completed && (
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Resultados de Optimización</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-700">-12%</p>
            <p className="text-sm text-green-600">Tiempo reducido</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">-8.3km</p>
            <p className="text-sm text-blue-600">Distancia ahorrada</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">+15%</p>
            <p className="text-sm text-purple-600">Eficiencia mejorada</p>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <p className="text-2xl font-bold text-emerald-700">-45kg</p>
            <p className="text-sm text-emerald-600">CO₂ reducido</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Ruta Optimizada Lista</p>
              <p className="text-sm opacity-90">
                Nueva secuencia de paradas calculada con IA - Ahorro estimado: 18.5%
              </p>
            </div>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Implementar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizer;