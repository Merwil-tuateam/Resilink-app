import React from 'react';
import { Leaf, Droplets, Wind } from 'lucide-react';

interface EnvironmentalImpactProps {
  co2Saved: number;
}

const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({ co2Saved }) => {
  const fuelSaved = (co2Saved * 0.42).toFixed(1); // Approximate conversion
  const treeEquivalent = Math.floor(co2Saved / 22); // Average CO2 absorption per tree per year

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-emerald-50 rounded-lg">
          <Leaf className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-emerald-700">{treeEquivalent}</p>
          <p className="text-xs text-emerald-600">Árboles equivalentes</p>
        </div>
        
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-700">{fuelSaved}L</p>
          <p className="text-xs text-blue-600">Combustible ahorrado</p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Wind className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-700">{co2Saved}kg</p>
          <p className="text-xs text-green-600">CO₂ reducido</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4 rounded-lg">
        <p className="text-sm font-medium">Impacto Ambiental Mensual</p>
        <p className="text-xs opacity-90">
          Contribuyendo a los Objetivos de Desarrollo Sostenible de la Comunitat Valenciana
        </p>
      </div>
    </div>
  );
};

export default EnvironmentalImpact;