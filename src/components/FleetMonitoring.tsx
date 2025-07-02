import React from 'react';
import { Truck, Fuel, Clock, AlertCircle, CheckCircle, Battery } from 'lucide-react';

// SRP: Separar datos de flota y utilidades
type FleetStatus = 'active' | 'collecting' | 'returning' | 'maintenance';
interface FleetVehicle {
  id: string;
  driver: string;
  route: string;
  status: FleetStatus;
  fuel: number;
  battery: number;
  lastUpdate: string;
  wasteLevel: number;
  efficiency: number;
}

const FLEET_DATA: FleetVehicle[] = [
  {
    id: 'V-024', driver: 'Carlos M.', route: 'Valencia Centro', status: 'active', fuel: 78, battery: 89, lastUpdate: '2 min', wasteLevel: 65, efficiency: 92,
  },
  {
    id: 'V-031', driver: 'Ana R.', route: 'Xàtiva - Sueca', status: 'collecting', fuel: 65, battery: 76, lastUpdate: '1 min', wasteLevel: 40, efficiency: 88,
  },
  {
    id: 'V-018', driver: 'Miguel T.', route: 'Gandia Costa', status: 'returning', fuel: 45, battery: 45, lastUpdate: '3 min', wasteLevel: 95, efficiency: 85,
  },
  {
    id: 'V-012', driver: 'Laura P.', route: 'Alzira Interior', status: 'maintenance', fuel: 92, battery: 100, lastUpdate: '15 min', wasteLevel: 0, efficiency: 0,
  },
];

const getStatusColor = (status: FleetStatus) => {
  switch (status) {
    case 'active': return 'bg-blue-100 text-blue-800';
    case 'collecting': return 'bg-orange-100 text-orange-800';
    case 'returning': return 'bg-green-100 text-green-800';
    case 'maintenance': return 'bg-red-100 text-red-800';
    default: return 'bg-slate-100 text-slate-800';
  }
};
const getStatusText = (status: FleetStatus) => {
  switch (status) {
    case 'active': return 'En Ruta';
    case 'collecting': return 'Recogiendo';
    case 'returning': return 'Retornando';
    case 'maintenance': return 'Mantenimiento';
    default: return 'Desconocido';
  }
};

const FleetMonitoring: React.FC = () => (
  <div className="space-y-6">
    {/* Fleet Overview */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Vehículos Activos</p>
            <p className="text-2xl font-bold text-slate-800">3</p>
          </div>
          <Truck className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Eficiencia Media</p>
            <p className="text-2xl font-bold text-slate-800">88%</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Combustible Medio</p>
            <p className="text-2xl font-bold text-slate-800">63%</p>
          </div>
          <Fuel className="w-8 h-8 text-orange-600" />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Alertas Activas</p>
            <p className="text-2xl font-bold text-slate-800">1</p>
          </div>
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
      </div>
    </div>
    {/* Fleet Details */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Estado Detallado de la Flota</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-medium text-slate-700">Vehículo</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Conductor</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Ruta</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Estado</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Combustible</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Batería</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Carga</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Eficiencia</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700">Última Act.</th>
            </tr>
          </thead>
          <tbody>
            {FLEET_DATA.map(vehicle => (
              <tr key={vehicle.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-4">
                  <div className="font-medium text-slate-800">{vehicle.id}</div>
                </td>
                <td className="py-4 px-4 text-slate-600">{vehicle.driver}</td>
                <td className="py-4 px-4 text-slate-600">{vehicle.route}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                    {getStatusText(vehicle.status)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${vehicle.fuel > 50 ? 'bg-green-500' : vehicle.fuel > 25 ? 'bg-orange-500' : 'bg-red-500'}`}
                        style={{ width: `${vehicle.fuel}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-600">{vehicle.fuel}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Battery className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{vehicle.battery}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${vehicle.wasteLevel}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-600">{vehicle.wasteLevel}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-slate-600">{vehicle.efficiency}%</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{vehicle.lastUpdate}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {/* Alerts */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Alertas y Notificaciones</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">Vehículo V-012 en mantenimiento</p>
            <p className="text-xs text-red-600">Revisión programada - Tiempo estimado: 2 horas</p>
          </div>
          <span className="text-xs text-red-600">Hace 15 min</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <Fuel className="w-5 h-5 text-orange-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-orange-800">V-018 requiere repostaje pronto</p>
            <p className="text-xs text-orange-600">Nivel de combustible: 45% - Autonomía: ~2 horas</p>
          </div>
          <span className="text-xs text-orange-600">Hace 5 min</span>
        </div>
      </div>
    </div>
  </div>
);

export default FleetMonitoring;