import React from 'react';
import { Recycle, BarChart3, Map, Truck, Settings, Brain, Edit } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Panel Principal', icon: BarChart3 },
    { id: 'map', label: 'Mapa en Tiempo Real', icon: Map },
    { id: 'fleet', label: 'Monitorización de Flota', icon: Truck },
    { id: 'analytics', label: 'Análisis Predictivo', icon: Brain },
    { id: 'optimizer', label: 'Optimizador de Rutas', icon: Settings },
    { id: 'editor', label: 'Editor de Rutas', icon: Edit }
  ];

  return (
    <header className="bg-white shadow-lg border-b border-slate-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-2 rounded-xl">
              <Recycle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Resilink
              </h1>
              <p className="text-sm text-slate-600">Sistema Inteligente de Optimización de Residuos</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-slate-600">Comunitat Valenciana</p>
            <p className="text-xs text-slate-500">Datos en tiempo real</p>
          </div>
        </div>
        
        <nav className="flex space-x-1 pb-4 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;